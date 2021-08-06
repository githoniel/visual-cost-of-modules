import { createContext, useContext, useState } from 'react'
import PackageManager from '@/lib/PackageManager'

export function usePMContextRoot() {
  const [pm] = useState(() => new PackageManager({
    registry: 'https://registry.npmjs.cf/'
  }))

  return {
    pm
  }
}

type PMContextType = ReturnType<typeof usePMContextRoot>

export const PMContext = createContext<PMContextType | undefined>(undefined)

export const usePM = () => useContext(PMContext)!
