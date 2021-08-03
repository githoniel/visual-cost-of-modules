import axios from 'axios'
import maxSatisfying from 'semver/ranges/max-satisfying'

export interface PkgInfo {
  name: string,
  version: string,
  dist: {
    size: number,
    tarball: string
  }
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
    [key: string]: PkgInfo & {
      dependencies: {
        [key: string]: string
      }[]
    }
  }
  dependencies: []
}

export default class PackageManager {
  public registry = 'https://api.npms.io/v2/package/'

  public timeout = 0

  constructor({
    registry,
    timeout
  }: {
    registry?: string
    timeout?: number
  } = {}) {
    if (registry) {
      this.registry = registry
    }
    if (timeout) {
      this.timeout = timeout
    }
  }

  async getMetadata(
    packageName: string,
    options: {
      version?: string
    } = {}
  ) {
    const { version } = options
    const pkgRequest = version
      ? `${window.encodeURIComponent(packageName)}/${window.encodeURIComponent(version)}`
      : `${window.encodeURIComponent(packageName)}`
    const requestData = await axios.get(
      `${this.registry}${pkgRequest}`,
      {
        timeout: this.timeout
      }
    )
    return requestData.data as RegistryPkgInfo & PkgInfo
  }

  async getDepsPkgInfo(
    packageName: string,
    requiredVersion: string
  ) {
    const pkgInfo = await this.getMetadata(packageName)
    const versions = Object.keys(pkgInfo.versions)

    const bestVersion = maxSatisfying(versions, requiredVersion)!
    return pkgInfo.versions[bestVersion] as RegistryPkgInfo & PkgInfo
  }
}
