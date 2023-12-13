import {create} from 'zustand'
import {createSelectors} from './createSelectors'
import {UserInfo} from '@vkontakte/vk-bridge'

interface UserStore {
	user: UserInfo | null
	setUser: (newUser: UserInfo | null) => void
	selectedGeo: string | undefined
	setSelectedGeo: (selectedGeo: string) => void
	currentGeo: string | undefined
	setCurrentGeo: (currentGeo: string) => void
}

const useUserStoreBase = create<UserStore>()((set) => ({
	user: null,
	setUser: (newUser) => set({user: newUser}),
	selectedGeo: undefined,
	setSelectedGeo: (selectedGeo) => set({selectedGeo}),
	currentGeo: undefined,
	setCurrentGeo: (currentGeo) => set({currentGeo}),
}))

export const useUserStore = createSelectors(useUserStoreBase)
