import BuildDataEvent, { GraphNode, EventType } from './BuildDataEvent'
import PackageManager, { PkgInfo, RegistryPkgInfo } from './PackageManager'

interface TaskPkg {
  name: string,
  requiredVersion: string,
  requiredBy: string,
}

interface TaskStack {
  level: number,
  cacheObj: {}
  stack: Array<TaskPkg>
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
  const pkgInfo = await pm.getMetadata(name, { version })
  const rootNode = getNodeData(pkgInfo, 0)
  event.dispatch(EventType.Data, {
    nodes: [rootNode]
  })
  // 队列任务
  const taskStack:TaskStack = {
    level: 1,
    cacheObj: {
      [rootNode.name]: true
    },
    stack: convertDepsToTask(rootNode.name, pkgInfo.dependencies)
  }
  updateDepsNodes(event, pm, taskStack)
}

async function updateDepsNodes(
  event: BuildDataEvent,
  pm: PackageManager,
  taskStack: TaskStack,
) {
  const currentLevelTask = taskStack.stack
  const currentLevel = taskStack.level
  taskStack.stack = []
  taskStack.level += 1

  const nodes: GraphNode[] = []

  await Promise.all(currentLevelTask.map(async ({
    name,
    requiredVersion,
    requiredBy
  }) => {
    const pkgInfo = await pm.getDepsPkgInfo(name, requiredVersion)
    const node = getNodeData(pkgInfo, currentLevel)
    node.link = {
      source: node.name,
      target: requiredBy
    }
    nodes.push(node)
    taskStack.stack = [
      ...taskStack.stack,
      ...convertDepsToTask(node.name, pkgInfo.dependencies)
    ]
    taskStack.cacheObj[node.name] = true
  }))
  event.dispatch(EventType.Data, {
    nodes,
  })
  // 嵌套一把
  if (taskStack.stack.length > 0) {
    updateDepsNodes(event, pm, taskStack)
  } else {
    taskStack.cacheObj = {}
    event.dispatch(EventType.End)
  }
}

function getNodeData(
  pkgInfo: RegistryPkgInfo & PkgInfo,
  currentLevel: number
): GraphNode {
  if (!pkgInfo) {
    debugger
  }
  const fullName = `${pkgInfo.name}@${pkgInfo.version}`
  return {
    name: fullName,
    data: {
      displaySize: pkgInfo.dist.size / 10240,
      depLevel: currentLevel,
      detail: pkgInfo
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
