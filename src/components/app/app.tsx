import {FC, useEffect, useState} from 'react'

import {send} from '@vkontakte/vk-bridge'
import {AdaptivityProvider, AppRoot, ConfigProvider, Platform, ScreenSpinner, platform} from '@vkontakte/vkui'
import {BREAKPOINTS} from '@vkontakte/vkui/dist/shared/breakpoints'
import {RouterProvider} from '@vkontakte/vk-mini-apps-router'
import {router, routes} from '@/router'
import {Layout} from '@/components'

import '@vkontakte/vkui/dist/vkui.css'
import './app.css'

import {QueryClient, QueryClientProvider, useQuery, useQueryClient} from '@tanstack/react-query'
import {Fallback} from '@/pages'
import {usePopoutStore, useUserStore} from '@/store'
import {ApiService} from '@/services'
import { AppInit } from '@/onbordings'


export const App: FC = () => {
	// INFO: VKUI не умеет нормально определять desktop вне фрейма,
	// INFO: поэтому если планируете использовать приложение только внутри ВК — этот код можно удалить.
	// INFO: Если определение desktop нужно, но изменять платформу при изменении размеров окна - нет,
	// INFO: то этот код можно удалить и в ConfigProvider прокинуть platform={currentPlatform()}
	const [platform, setPlatform] = useState<Platform>(currentPlatform)

	// INFO: Изменяем платформу при изменении размеров окна
	useEffect(() => {
		const onResize = () => {
			setPlatform(currentPlatform)
		}

		window.addEventListener('resize', onResize, false)
		return () => {
			window.removeEventListener('resize', onResize, false)
		}
	}, [])

	// INFO: Отсылаем событие инициализации и собираем инфу о пользователе
	const setUser = useUserStore.use.setUser()
	useEffect(() => {
		send('VKWebAppInit')
		// AppInit() // Тут был онбординг
		send('VKWebAppGetUserInfo').then((value) => setUser(value))
	}, [])

	// INFO: Получаем контекст RaactQuery
	const queryClient = new QueryClient()
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				notFound={<Fallback />}
			>
				<ConfigProvider platform={platform}>
					<AdaptivityProvider>
						<AppRoot>
							<Layout />
						</AppRoot>
					</AdaptivityProvider>
				</ConfigProvider>
			</RouterProvider>
		</QueryClientProvider>
	)
}

const currentPlatform = () => {
	if (window.innerWidth >= BREAKPOINTS.TABLET && window.matchMedia('(orientation: landscape)').matches) {
		return Platform.VKCOM
	}

	return platform() as Platform
}
