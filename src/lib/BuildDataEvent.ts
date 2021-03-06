import { EventEmitter } from 'events'
import type { PkgInfo, RegistryPkgInfo } from './PackageManager'

export interface GraphNodeScratch {
  displaySize: number,
  depLevel: number,
  detail: PkgInfo & RegistryPkgInfo
}
export interface GraphNode {
  data: {
    id: string,
  },
  style?: Object,
  scratch: GraphNodeScratch,
}

export interface GraphLink {
  data: {
    id: string,
    source: string,
    target: string
  },
  style?: Object,
}

export interface GraphData {
  nodes: Array<GraphNode>,
  edges: Array<GraphLink>
}

export enum EventType {
  Progress = 'progress',
  Data = 'data',
  Error = 'Error',
  End = 'end',
}

interface EventArgType {
  [EventType.Progress]: {
    count: number,
    level: number
  },
  [EventType.Data]: GraphData,
  [EventType.Error]: Error
  [EventType.End]: undefined
}

export default class BuildDataEvent<U> extends EventEmitter {
  constructor(public option: U) {
    super()
    this.option = option
  }

  dispatch<T extends keyof EventArgType, V extends EventArgType[T]>(
    eventName: T, data?: V
  ) {
    this.emit(eventName, data)
  }

  onEvent<T extends keyof EventArgType, V extends EventArgType[T]>(
    eventName: T, handler: (data: V) => void
  ) {
    this.on(eventName, handler)
    return this
  }
}
