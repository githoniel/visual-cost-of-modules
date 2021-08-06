import axios from 'axios'
import maxSatisfying from 'semver/ranges/max-satisfying'

export interface PkgInfo {
  name: string,
  version: string,
  homepage: string,
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

  public cache: {
    [key: string]: RegistryPkgInfo & PkgInfo
  } = {}

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
    let pkgInfo: RegistryPkgInfo & PkgInfo
    const cacheKey = `${packageName}@${requiredVersion}`
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey]
    } else {
      pkgInfo = await this.getMetadata(packageName)
      const versions = Object.keys(pkgInfo.versions)
      const bestVersion = requiredVersion === 'latest'
        ? pkgInfo['dist-tags'][requiredVersion]
        : maxSatisfying(versions, requiredVersion)!

      const result = pkgInfo.versions[bestVersion] as RegistryPkgInfo & PkgInfo
      if (!result) {
        throw new Error(`${cacheKey} no found in registry`)
      }
      this.cache[cacheKey] = result
      return result
    }
  }
}
