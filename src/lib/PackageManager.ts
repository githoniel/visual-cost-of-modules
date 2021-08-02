import axios from 'axios'

export interface PkgInfo {
  name: string,
  version: string,
}

export type DepsTree = PkgInfo & {
  dependencies: PkgInfo[]
}

export interface RegistryPkgInfo {
  'dist-tags': {
    [key: string]: string
  },
  name: string,
  versions: {
    [key: string]: any
  }
  dependencies: []
}

export default class PackageManager {
  public registry = 'https://api.npms.io/v2/package/'

  constructor({
    registry
  }: {
    registry?: string
  } = {}) {
    if (registry) {
      /**
       * @property {string} registry 当前包管理器registry
       */
      this.registry = registry
    }
  }

  async getMetadata(
    packageName: string,
    options: {
      version?: string
      timeout?: number
    } = {}
  ) {
    const { timeout = 0, version } = options
    const pkgRequest = version
      ? `${window.encodeURIComponent(packageName)}/${window.encodeURIComponent(version)}`
      : `${window.encodeURIComponent(packageName)}`
    const requestData = await axios.get(
      `${this.registry}${pkgRequest}`,
      {
        timeout
      }
    )
    return requestData.data as RegistryPkgInfo
  }

  async getDepsTree(
    packageName: string,
    options: {
      version: string
      timeout?: number
    }
  ) {
    const { version, timeout } = options
    const rootPkgInfo = await this.getMetadata(packageName, options)

    const depsTree = {
      name: packageName,
      version,
      dependencies: Object.keys(rootPkgInfo.dependencies).map((pkgName) => {
        const pkgVersion = rootPkgInfo.dependencies[pkgName]
        return {
          name: pkgName,
          version: pkgVersion
        }
      })
    }
    return this.updateDepsByBFS(depsTree, timeout)
  }

  async updateDepsByBFS(currentTree: DepsTree, timeout?: number) {
    await Promise.all(
      currentTree.dependencies
        .map(async (pkgInfo) => {
          const depInfo = await this.getMetadata(pkgInfo.name, {
            version: pkgInfo.version,
            timeout,
          })
        })
    )
  }
}
