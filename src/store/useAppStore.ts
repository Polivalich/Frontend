import { create } from 'zustand'
import { createSelectors } from './createSelectors'
import { ReactNode } from 'react'

interface AppStore {
    popout: ReactNode | null,
    setPopout: (popout: ReactNode) => void,
    clearPopout: () => void
}

  const useAppStoreBase = create<AppStore>()((set) => ({
    popout: null,
    setPopout: (popout) => set({ popout }),
    clearPopout: () => set({popout: null})
  }))

 export const useAppStore = createSelectors(useAppStoreBase)