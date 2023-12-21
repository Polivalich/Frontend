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
	Placeholder,
	Button,
	Tabs,
	TabsItem,
	classNames,
} from '@vkontakte/vkui'
import {Icon56DoNotDisturbOutline, Icon56SearchLikeFilledOutline} from '@vkontakte/icons'
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
import {useUserStore} from '@/store'
import {Plant} from '@/models/api'
import FlowerItem from '@/components/flowerItem/flowerItem'
import FlowerInfo from '@/components/flowerInfo/FlowerInfo'

const flowerInfo: any = [
	{
		battery: 85,
		potName: 'Горшок в гостиной',
		potId: '4599382',
		flowerName: 'Кактус',
		flowerImg:
			'https://images.unsplash.com/photo-1528476513691-07e6f563d97f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		waterLevel: true,
		schedule: 1,
	},
	{
		battery: 23,
		potName: 'Горшок в спальне',
		potId: '563882',
		flowerName: 'Суккулент',
		flowerImg:
			'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		waterLevel: false,
		schedule: 0,
	},
	{
		battery: 62,
		potName: 'Горшок на балконе',
		potId: '1926372',
		flowerName: 'Фиалка',
		flowerImg:
			'https://images.unsplash.com/photo-1542728928-0011f81446e5?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		waterLevel: false,
		schedule: 4,
	},
	{
		battery: 99,
		potName: 'Мини-горшок',
		potId: '4594393382',
		flowerName: 'Сирень',
		flowerImg:
			'https://images.unsplash.com/photo-1528476513691-07e6f563d97f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		waterLevel: true,
		schedule: 2,
	},
]

export const Home: FC<NavIdProps> = (props) => {
	const [selected, setSelected] = React.useState<string>('plants')

	const platform = usePlatform()
	const router = useRouteNavigator()
	const user = useUserStore.use.user()
	const [currentFlower, setCurrentFlower] = React.useState<string>('')

	const [plants, setPlants] = useState<Plant[]>([])
	const fetchData = async () => {
		try {
			const res = await ApiService.getPlants()
			setPlants(res)
		} catch (error) {
			console.error('error while fetching data', error)
		}
	}

	function handleCurrentFlowerChange(flowerName: string, potId: string) {
		setCurrentFlower(flowerName)
		flowerInfo?.forEach((flower: any) => {
			if (potId === flower.potId) {
				flower.flowerName = flowerName
			}
		})
	}

	function handleCurrentWaterScheduleChange(potId: string, schedule: number) {
		flowerInfo?.forEach((flower: any) => {
			if (potId === flower.potId) {
				flower.schedule = schedule
			}
		})
	}

	return (
		// Меняем панельку в соответствии с нуждами
		// Панелька как минимум плохо работает с IOS. Для Главное не нужна кнопка назад
		// Она НУЖНА там, где будет кнопка назад
		// В before добавляем кнопку назад. Через роутер добавляем ссылку назад

		// В Contet запихиваем контент, который будет в нижней части
		<Panel {...props}>
			<PanelHeader>POLIVALICH</PanelHeader>
			<Gradient className={classNames('Gradient', platform === Platform.VKCOM && 'Gradient__desktop')}>
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
				<SimpleCell disabled>Количество ваших горшочков: {flowerInfo.length}</SimpleCell>
				<Tabs
					mode="accent"
					layoutFillMode="auto"
					withScrollToSelectedTab
					scrollBehaviorToSelectedTab="nearest"
				>
					<HorizontalScroll arrowSize="m">
						<TabsItem
							selected={selected === 'plants'}
							id="tab-plants"
							onClick={() => {
								setSelected('plants')
							}}
						>
							Горшки
						</TabsItem>
						<TabsItem
							selected={selected === 'adding'}
							id="tab-adding"
							onClick={() => {
								setSelected('adding')
							}}
						>
							Добавить горшок
						</TabsItem>
						<TabsItem
							selected={selected === 'info'}
							id="tab-info"
							onClick={() => {
								setSelected('info')
							}}
						>
							Информация
						</TabsItem>
					</HorizontalScroll>
				</Tabs>
			</Gradient>
			<Spacing size={8}></Spacing>
			<Group>
				{/* <div className='home_header'>
				<SimpleSearch mobile={true} />
				<ContentPanel />
			</div> */}
				<Spacing size={8}></Spacing>
				{selected === 'plants' ? (
					flowerInfo.length > 0 ? (
						flowerInfo?.map((flower: any) => {
							return (
								<>
									<FlowerItem
										flowerImg={flower.flowerImg}
										battery={flower.battery}
										potId={flower.potId}
										flowerName={flower.flowerName}
										potName={flower.potName}
										waterLevel={flower.waterLevel}
										schedule={flower.schedule}
										handleCurrentFlowerChange={handleCurrentFlowerChange}
										handleCurrentScheduleChange={handleCurrentWaterScheduleChange}
									/>
									<Spacing />
								</>
							)
						})
					) : (
						<Placeholder
							icon={<Icon56DoNotDisturbOutline />}
							header="Нет подключенных горшков"
							action={<Button size="m">Подключить горшок</Button>}
						/>
					)
				) : selected === 'info' ? (
					<FlowerInfo />
				) : (
					<Placeholder
						icon={<Icon56SearchLikeFilledOutline />}
						header="Хотите подключить новый горшок?"
						action={<Button size="m">Подключить горшок</Button>}
					/>
				)}
			</Group>
		</Panel>
	)
}
