import { ENV } from '@/env'
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios'

const headers: Readonly<Record<string, string | boolean>> = {
	Accept: 'application/json',
	'Content-Type': 'application/json; charset=utf-8',
}

// Поскольку используем Vk mini apps, в Header Authorization добавляем фрейм с подписью
const injectAuthorization = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
	try {
		config.headers!.Authorization = window.location.href
		return config
	} catch (error) {
		throw new Error('User is not specified')
	}
}

class Http {
	// Создание пустого инстанса Аксиоса, на который мы будем вешать все настройки
	private instance: AxiosInstance | null = null

	// Геттер возвращает либо инстанс, либо инициирует создание инстанса
	private get http(): AxiosInstance {
		return this.instance != null ? this.instance : this.initHttp()
	}

	// Инициализация настроек инстанса
	initHttp() {
		const http = axios.create({
			baseURL: ENV.API,
			withCredentials: false,
		})

		// Вешаем интерцептор на запрос
		http.interceptors.request.use(injectAuthorization, (error) => Promise.reject(error))

		// Вешаем интерцептор на ответ
		// Пока пусть будет в комменте, тк удобнее пока использовать
		// Промисы для отлавливания ошибок

		// http.interceptors.response.use(
		// 	(response) => response,
		// 	(error) => {
		// 		const {response} = error
		//     console.error("FromInterceptor" + response)
		// 		return this.handleError(response)
		// 	},
		// )

		this.instance = http
		return http
	}

	request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
		return this.http.request(config)
	}

	get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.get<T, R>(url, config)
	}

	post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.post<T, R>(url, data, config)
	}

	put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.put<T, R>(url, data, config)
	}

	patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.patch<T, R>(url, data, config)
	}

	delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.delete<T, R>(url, config)
	}

	// Handle global app errors
	// We can handle generic app errors depending on the status code
	private handleError(error: AxiosError) {
		const {status} = error
		switch (status) {
			case 500: {
				// Handle InternalServerError
				break
			}
			case 403: {
				// Handle Forbidden
				break
			}
			case 401: {
				// Handle Unauthorized
				break
			}
			case 429: {
				// Handle TooManyRequests
				break
			}
		}

		return Promise.reject(error)
	}
}


class Pot {
	// Создание пустого инстанса Аксиоса, на который мы будем вешать все настройки
	private instance: AxiosInstance | null = null

	// Геттер возвращает либо инстанс, либо инициирует создание инстанса
	private get http(): AxiosInstance {
		return this.instance != null ? this.instance : this.initHttp()
	}

	// Инициализация настроек инстанса
	initHttp() {
		const http = axios.create({
			baseURL: ENV.POT_API,
			withCredentials: false,
		})

		// Вешаем интерцептор на запрос
		http.interceptors.request.use(injectAuthorization, (error) => Promise.reject(error))

		this.instance = http
		return http
	}

	request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
		return this.http.request(config)
	}

	get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.get<T, R>(url, config)
	}

	post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.post<T, R>(url, data, config)
	}

	put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.put<T, R>(url, data, config)
	}

	patch<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
		return this.http.patch<T, R>(url, data, config)
	}

	delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
		return this.http.delete<T, R>(url, config)
	}
}


export const $api = new Http()
export const $pot = new Pot()
