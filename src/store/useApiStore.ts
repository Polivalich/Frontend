import {create} from 'zustand'
import {createSelectors} from './createSelectors'

interface ApiStore {
	q: string
	setQ: (q: string) => void

	filters: Filters
	setFilters: (filters: Filters) => void

	currnetMap: any[]
	setCurrentMap: (map: any[]) => void
}

interface Filters {
	radius?: Number
}


const ApiStoreBase = create<ApiStore>()((set) => ({
	q: "",
	filters: {},
	setQ: (q) => set({q}),
	setFilters: (filters) => set({filters}),

	currnetMap: [],
	setCurrentMap: (map: any) => set({currnetMap: map})
}))

export const useApiStore = createSelectors(ApiStoreBase)
