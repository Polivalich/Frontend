import {$api} from '@/http'
import {TestPayload} from '@/models'

// Будем валидировать данные не в запросе, а до его создания
// В оберте над этими запросами, которые также можно выделить в отдельный файл

export class ApiService {
	static async test(testPayload: TestPayload) {
		return $api.post<TestPayload>('/test/', testPayload)
	}
}

// Запросы в коде можно писать оборачивая запросы выше в хендлер
// Также можно переписать все это с классов на простой экспорт методов,
// но тогда нужно будет более конкретно давать названия
