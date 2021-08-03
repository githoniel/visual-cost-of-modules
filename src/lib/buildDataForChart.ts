import { EventEmitter } from 'events'
import PackageManager, { PkgInfo, RegistryPkgInfo } from './PackageManager'

interface EChartGraphData {
  nodes: Array<{
    name: string,
    pkgName: string,
    version: string,
    symbolSize: number,
    tarball: string,
    category: number,
    label?: Object,
    tooltip?: Object
  }>,
  links: Array<{
    'source': string,
    'target': string
  }>,
  categories: Array<{
    'name': string
  }>
}

interface TaskStack {
  level: number,
  cacheObj: {}
  stack: Array<{
    name: string,
    requiredVersion: string,
    requiredBy: string,
  }>
}

export enum EventType {
  Data = 'data'
}

export default function buildData({
  pm,
  name,
  version,
}: {
  pm: PackageManager,
  name: string,
  version: string,
}) {
  const event = new EventEmitter()
  // 只包含根节点
  const currentData: EChartGraphData = {
    nodes: [],
    links: [],
    categories: []
  }
  updateData(event, pm, currentData, name, version)
  return event
}

async function updateData(
  event: EventEmitter,
  pm: PackageManager,
  currentData: EChartGraphData,
  name: string,
  version: string
) {
  const pkgInfo = await pm.getMetadata(name, { version })
  const fullName = `${pkgInfo.name}@${pkgInfo.version}`
  currentData.nodes.push({
    ...convertPkgInfoToNode(pkgInfo, 0),
    label: {
      show: true,
      position: 'inside',
    },
  })
  currentData.categories.push({
    name: 'root'
  })
  event.emit(EventType.Data, currentData)
  // 队列任务
  const taskStack:TaskStack = {
    level: 1,
    cacheObj: {
      [fullName]: true
    },
    stack: convertDepsToTask(fullName, pkgInfo.dependencies)
  }
  updateDepsNodes(event, pm, taskStack, currentData)
}

async function updateDepsNodes(
  event: EventEmitter,
  pm: PackageManager,
  taskStack: TaskStack,
  currentData: EChartGraphData
) {
  const currentLevelTask = taskStack.stack
  const currentLevel = taskStack.level
  taskStack.stack = []
  taskStack.level += 1
  await Promise.all(currentLevelTask.map(async ({
    name,
    requiredVersion,
    requiredBy
  }) => {
    const pkgInfo = await pm.getDepsPkgInfo(name, requiredVersion)
    const baseNode = convertPkgInfoToNode(pkgInfo, currentLevel)
    currentData.nodes.push(baseNode)
    currentData.links.push({
      source: baseNode.name,
      target: requiredBy
    })
    currentData.categories.push({
      name: `level-${currentLevel}`
    })
    taskStack.stack = [
      ...taskStack.stack,
      ...convertDepsToTask(requiredBy, pkgInfo.dependencies)
    ]
  }))
  event.emit(EventType.Data, currentData)
  if (taskStack.stack.length > 0) {
    updateDepsNodes(event, pm, taskStack, currentData)
  }
}

function convertPkgInfoToNode(
  pkgInfo: RegistryPkgInfo & PkgInfo,
  currentLevel: number
) {
  return {
    name: `${pkgInfo.name}@${pkgInfo.version}`,
    pkgName: pkgInfo.name,
    version: pkgInfo.version,
    symbolSize: pkgInfo.dist.size / 10240,
    size: pkgInfo.dist.size,
    tarball: pkgInfo.dist.tarball,
    category: currentLevel
  }
}

function convertDepsToTask(
  requiredByName: string,
  dependencies: {}
) {
  if (dependencies) {
    return Object.keys(dependencies).map((depName) => {
      const requiredVersion = dependencies[depName]
      return {
        name: depName,
        requiredVersion,
        requiredBy: requiredByName
      }
    })
  }
  return []
}
