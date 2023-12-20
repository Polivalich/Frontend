import {z} from 'zod'
import {buildEnvProxy} from './buildEnvProxy'

const ENVBase = buildEnvProxy<Record<string, unknown>>(import.meta.env, (key) => `VITE_${key}`)

// Создание схемы валидации Env файла
export const envSchema = z.object({
	API: z.string(),
	NUMBER: z.coerce.number(),
	BOOL: z.coerce.boolean(),
	POT_API: z.string(),
})

// Функция для проверки ENV
export const parseEnv = (configObj: Record<string, unknown>) => {
	const parseResult = envSchema.safeParse(configObj)

	if (!parseResult.success) throw parseResult.error

	return parseResult.data
}

export const ENV = parseEnv(ENVBase)
export type ENV = typeof ENV
