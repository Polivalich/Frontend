import {RoutesConfig, createHashRouter, createPanel, createRoot, createView} from '@vkontakte/vk-mini-apps-router'

// Будем обращаться к маршрутам через переменные, чтобы избежать мисспелов
export enum URL {
	homeView = 'home',

	homePanel = '/',
	personalPanel = '/personal',
	plantsPanel = '/plants',
	favoritesPanel = '/favorites',
	connectionPanel = '/connection',
}

export const routes = RoutesConfig.create([
	createRoot('root', [
		createView(URL.homeView, [
			createPanel(URL.homePanel, URL.homePanel, []),
			createPanel(URL.personalPanel, URL.personalPanel, []), // Тут страница пользователя

			createPanel(URL.favoritesPanel, URL.favoritesPanel, []),
			createPanel(URL.plantsPanel, URL.plantsPanel, []),
			createPanel(URL.connectionPanel, URL.connectionPanel, []),
		]),
	]),
])

export const router = createHashRouter(routes.getRoutes())
