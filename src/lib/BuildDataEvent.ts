import { EventEmitter } from 'events'
import type { PkgInfo, RegistryPkgInfo } from './PackageManager'

export enum EventType {
  Data = 'data',
  Error = 'Error',
  End = 'end',
}

export interface GraphNode {
  name: string,
  data: {
    displaySize: number,
    depLevel: number,
    detail: PkgInfo & RegistryPkgInfo
  },
  link?: Link
}

export interface Link {
  source: string,
  target: string
}

interface EventArgType {
  [EventType.Data]: {
    nodes: Array<GraphNode>
  },
  [EventType.Error]: Error
  [EventType.End]: undefined
}

export default class BuildDataEvent extends EventEmitter {
  dispatch<T extends keyof EventArgType, V extends EventArgType[T]>(
    eventName: T, data?: V
  ) {
    this.emit(eventName, data)
  }

  onEvent<T extends keyof EventArgType, V extends EventArgType[T]>(
    eventName: T, handler: (data: V) => void
  ) {
    this.on(eventName, handler)
  }
}
