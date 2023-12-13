import {Div, Headline, HorizontalCell, HorizontalScroll, NavIdProps, Panel, PanelHeader, PanelHeaderBack, usePlatform} from '@vkontakte/vkui'
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'
import {Content} from '@/components/content'
import { FC } from 'react'

export const Favorites: FC<NavIdProps> = (props) => {
	const platform = usePlatform()
	const router = useRouteNavigator()
	return (
		<Panel {...props}>
			{/* {platform !== Platform.VKCOM && <PanelHeader>Prisma</PanelHeader>} */}
			<PanelHeader before={<PanelHeaderBack onClick={() => router.back()} />}>Избранное</PanelHeader>
			<Content>
				<Div>
					<Headline
						level="1"
						weight="2"
					>
						Открывайте новое
					</Headline>
				</Div>

				<HorizontalScroll
					showArrows
					getScrollToLeft={(i) => i - 120}
					getScrollToRight={(i) => i + 120}
				>
					{/* {data.map((item, key) => {
						return (
							<>
								<HorizontalCell size="l">
									<BannerMain
										key={key}
										//@ts-ignore
										header={banner.title}
										subheader={banner.subtitle}
										url={item.url}
									/>
								</HorizontalCell>
							</>
						)
					})} */}
					{/* <div>СЮДА МОЖНО МОИ ЦВЕТЫ</div> */}
				</HorizontalScroll>
			</Content>
		</Panel>
	)
}
