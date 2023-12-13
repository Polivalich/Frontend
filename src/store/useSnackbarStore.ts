import { create } from 'zustand'
import { createSelectors } from './createSelectors'
import { ReactNode } from 'react'

interface SnackbarStore {
    snackbar: ReactNode,
    setSnackbar: (snackbar: ReactNode) => void
}

  const useSnackbarStoreBase = create<SnackbarStore>()((set) => ({
    snackbar: null,
    setSnackbar: (snackbar) => set({ snackbar }) 
  }))

 export const useSnackbarStore = createSelectors(useSnackbarStoreBase)
