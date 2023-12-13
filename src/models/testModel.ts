import {z} from 'zod'

// interface of the model and validation if it exists
export interface TestPayload {
	email: string
}

export const testValidation = z.object({
	email: z
		.string({
			required_error: 'Enter an email address',
		})
		.email(),
})


export interface mockSearchData {
	data: number
	name: string
}