import React, {FC} from 'react'
import './home.css'
import {
	Card,
	CardGrid,
	CardScroll,
	Div,
	Group,
	Headline,
	HorizontalCell,
	HorizontalScroll,
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelHeaderButton,
	Platform,
	SimpleCell,
	Spacing,
	usePlatform,
} from '@vkontakte/vkui'
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'
import {URL} from '@/router'
import {Icon28ChevronRightOutline, Icon28CompassOutline, Icon28ErrorOutline, Icon28PawOutline} from '@vkontakte/icons'
import {Content} from '@/components/content'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {ApiService} from '@/services'


export const Home: FC<NavIdProps> = (props) => {
	const platform = usePlatform()
	const router = useRouteNavigator()
	return (
		// Меняем панельку в соответствии с нуждами
		// Панелька как минимум плохо работает с IOS. Для Главное не нужна кнопка назад
		// Она НУЖНА там, где будет кнопка назад
		// В before добавляем кнопку назад. Через роутер добавляем ссылку назад

		// В Contet запихиваем контент, который будет в нижней части
		<Panel {...props}>
			{platform !== Platform.VKCOM && <PanelHeader>Prisma</PanelHeader>}
			{/* {platform !== Platform.VKCOM && (
				<PanelHeader before={<PanelHeaderBack onClick={() => router.back()} />}>Название страницы</PanelHeader>
			)} */}
			<Spacing size={8}></Spacing>
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
					{/* {Banners.map((banner, key) => {
						return (
							<>
								<HorizontalCell size="l">
									<BannerMain
										key={key}
										//@ts-ignore
										header={banner.title}
										subheader={banner.subtitle}
										url={banner.url}
									/>
								</HorizontalCell>
							</>
						)
					})} */}
				</HorizontalScroll>

				<Div>
					<Headline
						level="1"
						weight="2"
					>
						Рекомендуем посетить
					</Headline>
				</Div>
			</Content>
		</Panel>
	)
}
