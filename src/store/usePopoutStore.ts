import { create } from 'zustand'
import { createSelectors } from './createSelectors'
import { ReactNode } from 'react'

interface PopoutStore {
    popout: ReactNode | null,
    setPopout: (popout: ReactNode) => void,
    clearPopout: () => void
}

  const usePopoutStoreBase = create<PopoutStore>()((set) => ({
    popout: null,
    setPopout: (popout) => set({ popout }),
    clearPopout: () => set({popout: null})
  }))

 export const usePopoutStore = createSelectors(usePopoutStoreBase)