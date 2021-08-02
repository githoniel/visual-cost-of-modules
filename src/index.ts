import './App'

import PM from '@/lib/PackageManager'

const pm = new PM({
  registry: 'https://registry.cnpmjs.org/'
})

pm.getMetadata('@gem-mine/cli').then((t) => {
  console.log(t)
})
