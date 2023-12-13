import {FC} from 'react'
import {Div, NavIdProps, Panel, PanelHeader, PanelHeaderBack, usePlatform} from '@vkontakte/vkui'
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'
import {Content} from '@/components/content'
import { VoidPlaceholder } from './placeholder'

export const Filters: FC<NavIdProps> = (props) => {
	const platform = usePlatform()
	const router = useRouteNavigator()
	return (
		<Panel {...props}>
			{/* {platform !== Platform.VKCOM && <PanelHeader>Prisma</PanelHeader>} */}
			<PanelHeader before={<PanelHeaderBack onClick={() => router.back()} />}>Фильтры</PanelHeader>
			<Content>
				<VoidPlaceholder />
			</Content>
		</Panel>
	)
}
