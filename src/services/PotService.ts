import {$pot} from '@/http'
import {TestPayload} from '@/models'
import { ConnectionForm, ConnectionResponse, Plant } from '@/models/api'

export class PotService {
	static async connect(payload: ConnectionForm) {
		return $pot.post<ConnectionForm, ConnectionResponse>('/connect', payload)
	}
}

// Запросы в коде можно писать оборачивая запросы выше в хендлер
// Также можно переписать все это с классов на простой экспорт методов,
// но тогда нужно будет более конкретно давать названия
