import BuildDataEvent, { GraphNode, EventType, GraphLink } from './BuildDataEvent'
import getStellarColor from './getStellarColor'
import PackageManager, { PkgInfo, RegistryPkgInfo } from './PackageManager'

interface TaskPkg {
  name: string,
  requiredVersion: string,
  requiredBy: string,
}

interface TaskStack {
  level: number,
  taskHistory: Object,
  task: Array<TaskPkg>
}

export default function createGraphEvent({
  pm,
  name,
  version,
}: {
  pm: PackageManager,
  name: string,
  version: string,
}) {
  const event = new BuildDataEvent()
  updateRootData(event, pm, name, version)
  return event
}

async function updateRootData(
  event: BuildDataEvent,
  pm: PackageManager,
  name: string,
  version: string
) {
  event.dispatch(EventType.Progress, {
    count: 1,
    level: 0,
  })
  const pkgInfo = await pm.getMetadata(name, { version })
  const rootNode = getNodeData(pkgInfo, 0)
  const nodeName = rootNode.data.id
  event.dispatch(EventType.Data, {
    nodes: [rootNode],
    edges: []
  })
  // 队列任务
  const taskStack:TaskStack = {
    level: 1,
    taskHistory: {
      [nodeName]: true
    },
    task: convertDepsToTask(nodeName, pkgInfo.dependencies)
  }
  updateDepsNodes(event, pm, taskStack)
}

async function updateDepsNodes(
  event: BuildDataEvent,
  pm: PackageManager,
  taskStack: TaskStack,
) {
  const currentLevelTask = taskStack.task
  const currentLevel = taskStack.level
  taskStack.task = []
  taskStack.level += 1
  const nodes: GraphNode[] = []
  const links: GraphLink[] = []
  event.dispatch(EventType.Progress, {
    count: currentLevelTask.length,
    level: currentLevel,
  })
  await Promise.all(currentLevelTask.map(async ({
    name,
    requiredVersion,
    requiredBy
  }) => {
    const pkgInfo = await pm.getDepsPkgInfo(name, requiredVersion)
    const node = getNodeData(pkgInfo, currentLevel)
    const nodeName = node.data.id
    if (!taskStack.taskHistory[nodeName]) {
      taskStack.taskHistory[nodeName] = true
      nodes.push(node)
      taskStack.task = [
        ...taskStack.task,
        ...convertDepsToTask(
          nodeName,
          pkgInfo.dependencies,
          taskStack.taskHistory
        )
      ]
    }
    links.push({
      data: {
        id: `${nodeName} -> ${requiredBy}`,
        source: nodeName,
        target: requiredBy
      }
    })
  })).catch((e) => {
    event.dispatch(EventType.Error, e)
    throw e
  })
  event.dispatch(EventType.Data, {
    nodes,
    edges: links
  })
  // 嵌套一把
  if (taskStack.task.length > 0) {
    updateDepsNodes(event, pm, taskStack)
  } else {
    taskStack.taskHistory = {}
    event.dispatch(EventType.End)
  }
}

function getNodeData(
  pkgInfo: RegistryPkgInfo & PkgInfo,
  currentLevel: number
): GraphNode {
  const fullName = `${pkgInfo.name}@${pkgInfo.version}`
  const displaySize = Math.max(pkgInfo.dist.size / 20480, 5)
  return {
    data: {
      id: fullName
    },
    scratch: {
      displaySize,
      depLevel: currentLevel,
      detail: pkgInfo
    },
    style: {
      height: displaySize,
      width: displaySize,
      'background-color': getStellarColor(currentLevel)
    }
  }
}

function convertDepsToTask(
  requiredByName: string,
  dependencies: {},
  cacheFilter: {} = {}
): Array<TaskPkg> {
  if (dependencies) {
    return Object.keys(dependencies).map((depName) => {
      if (cacheFilter[depName]) {
        return null
      }
      const requiredVersion = dependencies[depName]
      return {
        name: depName,
        requiredVersion,
        requiredBy: requiredByName
      }
    }).filter(nonNullable)
  }
  return []
}

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}
