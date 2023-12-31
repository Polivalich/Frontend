import {create} from 'zustand'
import {createSelectors} from './createSelectors'
import { ModalIdType } from '@/models'

interface ModalStore {
	modal: string | undefined
	setModal: (modal: ModalIdType | undefined) => void
	cardModalData: any | null
	setCardModalData: (data: any) => void
	clearModal: () => void
}

const ModalStoreBase = create<ModalStore>()((set) => ({
	modal: undefined,
	setModal: (modal) => set({modal}),
	clearModal: () => set({modal: undefined}),
	cardModalData: null,
	setCardModalData: (data) => set({cardModalData: data}),
}))

export const useModalStore = createSelectors(ModalStoreBase)
