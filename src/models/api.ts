import { boolean } from "zod"

export interface Plant {
    id: number
    name: string
    power: number
    type: number
}


export type ConnectionStateType = 'pending' | 'connected' | 'failed' | 'waiting'

export interface ConnectionForm {
	login: string
	password: string
}

export interface ConnectionResponse {
    data: {
        status: ConnectionStateType
    }
}

export type Networks = string[]

export interface Flower {
    id: string
    description: string
    image: string
    name: string
    on_soil: number
    owned: boolean
}

export type CreateFlower = Omit<Flower, 'owned' | "id">

export type PatchFlower = Partial<Omit<Flower, 'id'> & {
	delete_description?: boolean
	delete_image?: boolean
}>

export interface getFlowersResponse {
	data: {
		count: number
		items: Flower[]
	}
}