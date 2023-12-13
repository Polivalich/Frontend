import {FC} from 'react'
import {Group, NavIdProps, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui'

import {VoidPlaceholder} from '@/components'
import {useFirstPageCheck, useRouteNavigator} from '@vkontakte/vk-mini-apps-router'

export const Fallback: FC<NavIdProps> = (props) => {
	const router = useRouteNavigator()
	const isFirstPage = useFirstPageCheck()
	return (
		<Panel {...props}>
			<PanelHeader before={<PanelHeaderBack onClick={() => (isFirstPage ? router.push('/') : router.back())} />}>
				404 - страница не найдена
			</PanelHeader>
			<VoidPlaceholder />
		</Panel>
	)
}
