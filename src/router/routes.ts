import {RoutesConfig, createHashRouter, createPanel, createRoot, createView} from '@vkontakte/vk-mini-apps-router'

// Будем обращаться к маршрутам через переменные, чтобы избежать мисспелов
export enum URL {
	homeView = 'home',
	personalProfileView = 'personalProfile',
	organizationProfileView = 'organizationProfile',

	homePanel = '/',
	personalPanel = '/personal',
	organizationPanel = '/organization',
	filtersPanel = '/filters',
	prizmaPanel = '/prizma',
	routePanel = '/route',
	favoritesPanel = '/favorites',
	historyPanel = '/history',
	locationPanel = '/location',

	// old delete later
	persikPanel = '/persik',
	componentsPanel = '/components',
	infoPanel = '/info',
	testGPTPanel = '/test',
	testGPTView = 'testGPT',
}

export const routes = RoutesConfig.create([
	createRoot('root', [
		createView(URL.homeView, [
			createPanel(URL.homePanel, URL.homePanel, []),
		]),
	]),
])

export const router = createHashRouter(routes.getRoutes())
