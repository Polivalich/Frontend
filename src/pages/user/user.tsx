import React, {FC, useEffect} from 'react'
import {useActionRef} from '@/hooks'
import {
	Icon16Dropdown,
	Icon24Done,
	Icon28CoinsOutline,
	Icon28CupOutline,
	Icon28FavoriteOutline,
	Icon28HistoryBackwardOutline,
	Icon28LocationMapOutline,
	Icon28PrivacyOutline,
	Icon28UserOutline,
	Icon28Users3Outline,
	Icon28WarningTriangleOutline,
} from '@vkontakte/icons'
import {send} from '@vkontakte/vk-bridge'
import {
	Avatar,
	Group,
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelHeaderContent,
	PanelHeaderContext,
	ScreenSpinner,
	SimpleCell,
	usePlatform,
} from '@vkontakte/vkui'
import {classNamesString} from '@vkontakte/vkui/dist/lib/classNames'

import {ErrorSnackbar, SuccessSnackbar, VoidPlaceholder} from '@/components'
import {useModalStore, usePopoutStore, useSnackbarStore, useUserStore} from '@/store'

import {TestActionSheet, TestAlert, TestModalCard} from '@/popouts'
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'
import {URL} from '@/router'

export const User: FC<NavIdProps> = (props) => {
	const user = useUserStore.use.user()
	const setUser = useUserStore.use.setUser()
	const setSnackbar = useSnackbarStore.use.setSnackbar()
	const clearPopout = usePopoutStore.use.clearPopout()
	const setPopout = usePopoutStore.use.setPopout()
	const setModal = useModalStore.use.setModal()

	const {setActionRefHandler} = useActionRef(() => setPopout(<TestActionSheet />))

	useEffect(() => {
		send('VKWebAppGetUserInfo').then((value) => setUser(value))
	}, [])

	const setLoadingScreenSpinner = () => {
		setPopout(<ScreenSpinner state="loading" />)
		setTimeout(clearPopout, 2000)
	}

	const [contextOpened, setContextOpened] = React.useState(false)
	const [mode, setMode] = React.useState('all')

	const toggleContext = () => {
		setContextOpened((prev) => !prev)
	}
	const select = (e: any) => {
		const mode = e.currentTarget.dataset.mode
		setMode(mode)
		requestAnimationFrame(toggleContext)
	}

	const router = useRouteNavigator()
	return (
		<Panel {...props}>
			<PanelHeader before={<PanelHeaderBack onClick={() => router.back()} />}>
				<PanelHeaderContent
					status="Путешественник"
					before={
						<Avatar
							src={user?.photo_100}
							size={40}
						/>
					}
					aside={
						<Icon16Dropdown
							style={{
								transform: `rotate(${contextOpened ? '180deg' : '0'})`,
							}}
						/>
					}
					onClick={toggleContext}
				>
					{user?.first_name} {user?.last_name}
				</PanelHeaderContent>
			</PanelHeader>
			<PanelHeaderContext
				opened={contextOpened}
				onClose={toggleContext}
			>
				<SimpleCell
					before={<Icon28UserOutline />}
					after={mode === 'all' ? <Icon24Done fill="var(--vkui--color_icon_accent)" /> : null}
					onClick={select}
					data-mode="all"
				>
					Личный
				</SimpleCell>
				<SimpleCell
					before={<Icon28Users3Outline />}
					after={mode === 'managed' ? <Icon24Done fill="var(--vkui--color_icon_accent)" /> : null}
					onClick={select}
					data-mode="managed"
				>
					Организация
				</SimpleCell>
			</PanelHeaderContext>
			<Group>
				<SimpleCell
					before={<Icon28LocationMapOutline />}
					onClick={() => router.push(URL.locationPanel)}
				>
					Мое местоположение
				</SimpleCell>
				<SimpleCell
					before={<Icon28FavoriteOutline />}
					onClick={() => router.push(URL.favoritesPanel)}
				>
					Избранное
				</SimpleCell>

				<SimpleCell
					before={<Icon28HistoryBackwardOutline />}
					onClick={() => router.push(URL.historyPanel)}
				>
					История
				</SimpleCell>

				<SimpleCell
					before={<Icon28CoinsOutline />}
					onClick={() => setPopout(<TestAlert />)}
				>
					Коины
				</SimpleCell>

				<SimpleCell
					before={<Icon28LocationMapOutline />}
					onClick={() => router.push(URL.routePanel)}
				>
					Мои маршруты
				</SimpleCell>

				<SimpleCell
					before={<Icon28CupOutline />}
					onClick={() => setPopout(<TestAlert />)}
				>
					Мои достижения
				</SimpleCell>

				<SimpleCell
					before={<Icon28PrivacyOutline />}
					onClick={() => setPopout(<TestAlert />)}
				>
					Приватность
				</SimpleCell>
			</Group>
		</Panel>
	)
}
