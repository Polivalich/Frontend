import React, {FC, useEffect} from 'react'
import {useActionRef} from '@/hooks'
import {send} from '@vkontakte/vk-bridge'

import {useModalStore, usePopoutStore, useSnackbarStore, useUserStore} from '@/store'

import {TestActionSheet, TestAlert, TestModalCard} from '@/popouts'
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'
import {URL} from '@/router'
import { Avatar, Group, NavIdProps, Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, ScreenSpinner, SimpleCell } from '@vkontakte/vkui'
import { Icon28LocationMapOutline, Icon28FavoriteOutline } from '@vkontakte/icons'

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



	const router = useRouteNavigator()
	return (
		<Panel {...props}>
			<PanelHeader before={<PanelHeaderBack onClick={() => router.back()} />}>
				<PanelHeaderContent
					status="Садовод"
					before={
						<Avatar
							src={user?.photo_100}
							size={40}
						/>
					}
				>
					{user?.first_name} {user?.last_name}
				</PanelHeaderContent>
			</PanelHeader>
			<Group>
				<SimpleCell
					before={<Icon28LocationMapOutline />}
					onClick={() => router.push(URL.plantsPanel)}
				>
					Мои растения
				</SimpleCell>
				<SimpleCell
					before={<Icon28FavoriteOutline />}
					onClick={() => router.push(URL.favoritesPanel)}
				>
					Избранное
				</SimpleCell>

				<SimpleCell
					before={<Icon28FavoriteOutline />}
					onClick={() => router.push(URL.connectionPanel)}
				>
					Новое подключение
				</SimpleCell>

			</Group>
		</Panel>
	)
}
