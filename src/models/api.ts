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