import {$api} from '@/http'
import {TestPayload} from '@/models'
import { CreateFlower, Flower, FlowerPayload, PatchFlower, Plant, getFlowersResponse } from '@/models/api'

// Будем валидировать данные не в запросе, а до его создания
// В оберте над этими запросами, которые также можно выделить в отдельный файл

export class ApiService {
	static async test(testPayload: TestPayload) {
		return $api.post<TestPayload>('/test/', testPayload)
	}

	static async getFlowersInfo() {
		return $api.get<any, getFlowersResponse>('/flowers')
	}

	static async createFlower(payload: CreateFlower) {
		return $api.post<CreateFlower>(`/flowers`, payload)
	}

	static async fixFLowerInfo(id: number, payload: PatchFlower) {
		return $api.patch<PatchFlower>(`/flowers/${id}`, payload)
	}

	static async deleteFlower(id: number) {
		return $api.delete<any>(`/flowers/${id}`)
	}
}

// Запросы в коде можно писать оборачивая запросы выше в хендлер
// Также можно переписать все это с классов на простой экспорт методов,
// но тогда нужно будет более конкретно давать названия
