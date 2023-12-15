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
import {Plant} from '@/models/api'
import FlowerItem from '@/components/flowerItem/flowerItem'

const flowerInfo = {
	battery: 85,
	potName: 'Горшок в гостиной',
	potId: 4599382,
	flowerName: 'Суккулент',
	flowerImg: 'https://a-r-s.ru/wp-content/uploads/28-536.jpg',
	waterLevel: true,
	schedule: 1,
}

export const Home: FC<NavIdProps> = (props) => {
	const platform = usePlatform()
	const router = useRouteNavigator()
	const user = useUserStore.use.user()
	const [currentFlower, setCurrentFlower] = React.useState<string>(flowerInfo.flowerName)

	const [plants, setPlants] = useState<Plant[]>([])
	const fetchData = async () => {
		try {
			const res = await ApiService.getPlants()
			setPlants(res)
		} catch (error) {
			console.error('error while fetching data', error)
		}
	}

	function handleCurrentFlowerChange(flowerName: any) {
		if (flowerName !== flowerInfo.flowerName) {
			setCurrentFlower(flowerName)
			console.log('все круто')
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
			<div className="group_container">
				<FlowerItem
					flowerImg={flowerInfo.flowerImg}
					battery={flowerInfo.battery}
					potId={flowerInfo.potId}
					flowerName={currentFlower}
					potName={flowerInfo.potName}
					waterLevel={flowerInfo.waterLevel}
					schedule={flowerInfo.schedule}
					handleCurrentFlowerChange={handleCurrentFlowerChange}
				/>
				{/* <FlowerItem
					flowerImg={flowerInfo.flowerImg}
					battery={flowerInfo.battery}
					potId={flowerInfo.potId}
					flowerName={flowerInfo.flowerName}
					potName={flowerInfo.potName}
				/> */}
			</div>
		</Panel>
	)
}
