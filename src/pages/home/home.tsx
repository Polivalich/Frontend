import React, {FC, useState} from 'react'
import './home.css'
import {
	Avatar,
	Card,
	CardGrid,
	CardScroll,
	Div,
	Gradient,
	Group,
	Headline,
	HorizontalCell,
	HorizontalScroll,
	NavIdProps,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelHeaderButton,
	PanelHeaderContent,
	Platform,
	SimpleCell,
	Spacing,
	Title,
	Text,
	usePlatform,
} from '@vkontakte/vkui'
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'
import {URL} from '@/router'
import {
	Icon28ChevronRightOutline,
	Icon28CompassOutline,
	Icon28ErrorOutline,
	Icon28LocationOutline,
	Icon28PawOutline,
} from '@vkontakte/icons'
import {Content, ContentPanel} from '@/components/content'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {ApiService} from '@/services'
import {SimpleSearch} from '@/components'
import {useUserStore} from '@/store'
import {classNamesString} from '@vkontakte/vkui/dist/lib/classNames'
import { Plant } from '@/models/api'

export const Home: FC<NavIdProps> = (props) => {
	const platform = usePlatform()
	const router = useRouteNavigator()
	const user = useUserStore.use.user()

	const [plants, setPlants] = useState<Plant[]>([])
	const fetchData = async () => {
		try {
			const res = await ApiService.getPlants()
			setPlants(res)
		} catch (error) {
			console.error("error while fetching data", error)
		}
	}

	return (
		// Меняем панельку в соответствии с нуждами
		// Панелька как минимум плохо работает с IOS. Для Главное не нужна кнопка назад
		// Она НУЖНА там, где будет кнопка назад
		// В before добавляем кнопку назад. Через роутер добавляем ссылку назад

		// В Contet запихиваем контент, который будет в нижней части
		<Panel {...props}>
			<PanelHeader>POLIVALICH</PanelHeader>
			<Gradient className={classNamesString('Gradient', platform === Platform.VKCOM && 'Gradient__desktop')}>
				<Avatar
					style={{cursor: 'pointer'}}
					src={user?.photo_100}
					size={96}
					withBorder={false}
					onClick={() => router.push(URL.personalPanel)}
				/>
				<Title
					className="Gradient_Title"
					level="2"
					weight="2"
				>
					{!user && 'Загрузка...'}
					{user?.first_name} {user?.last_name}
				</Title>
				{/* <Text
					weight="3"
					className="Gradient_Subtitle"
				>
					Пользователь
				</Text> */}
			</Gradient>

			{/* <div className='home_header'>
				<SimpleSearch mobile={true} />
				<ContentPanel />
			</div> */}
			<Spacing size={8}></Spacing>
			<div className='group_container'>
				<div className="flower_card">
					<img
						src="https://images.unsplash.com/photo-1495231916356-a86217efff12?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Picture"
						className="flower_img"
					/>
					<div className="flower_content">
						<div className="flower_card_header">
							<h3 className="flower_card_title">Название цветка</h3>
							<p className="flower_card_power">Уровень заряда</p>
						</div>
						<div className="flower_card_bottom">some descr</div>
					</div>
				</div>

				<div className="flower_card">
					<img
						src="https://images.unsplash.com/photo-1495231916356-a86217efff12?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Picture"
						className="flower_img"
					/>
					<div className="flower_content">
						<div className="flower_card_header">
							<h3 className="flower_card_title">Название цветка</h3>
							<p className="flower_card_power">Уровень заряда</p>
						</div>
						<div className="flower_card_bottom">some descr</div>
					</div>
				</div>
				</div>
		</Panel>
	)
}
