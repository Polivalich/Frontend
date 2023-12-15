import {FC} from 'react'
import React from 'react'

import {
	Div,
	Input,
	ModalPage,
	ModalPageHeader,
	Header,
	NavIdProps,
	CustomSelect,
	IconButton,
	FormItem,
	Select,
	Group,
	SimpleCell,
} from '@vkontakte/vkui'
import {useModalStore} from '@/store'
import {Icon16Clear} from '@vkontakte/icons'
import CustomSearchLogicSelect from '@/components/CustomSearch/customSearch'

const existingFlowers = [
	{
		value: '1',
		label: 'Замиокулькас',
	},
	{
		value: '2',
		label: 'Суккулент',
	},
	{
		value: '3',
		label: 'Кактус',
	},
	{
		value: '4',
		label: 'Сантолина',
	},
	{
		value: '5',
		label: 'Сирень',
	},
	{
		value: '6',
		label: 'Сныть',
	},
]

export const FlowerModal: FC<NavIdProps> = (props) => {
	const clearModal = useModalStore.use.clearModal()
	const cardModalData = useModalStore.use.cardModalData()
	const [schedule, setSchedule] = React.useState(cardModalData?.schedule)


	React.useEffect(() => {
		console.log('yes')
	}, [cardModalData?.waterLevel])

	React.useEffect(() => {
		if (schedule !== cardModalData?.schedule) {
			console.log('Меняем расписание', schedule)
			// тут какая-то апишка на смену РАСПИСАНИЯ
			//handleScheduleChange();
		}
	}, [schedule])

	return (
		<ModalPage
			{...props}
			onClose={clearModal}
			header={<ModalPageHeader>{cardModalData?.potName}</ModalPageHeader>}
		>
			<Group header={<Header mode="secondary">Информация о текущем горшке</Header>}>
				<SimpleCell>Уровень заряда вашего горшка: {cardModalData?.battery}%</SimpleCell>
				{cardModalData?.waterLevel ? (
					<SimpleCell>Текущий уровень воды в норме</SimpleCell>
				) : (
					<SimpleCell>Вода в горшке заканчивается! Время долить водичку</SimpleCell>
				)}
			</Group>
			<Group header={<Header mode="secondary">Цветочек в горшке</Header>}>
				{/* <SimpleCell expandable>{cardModalData?.flowerName}</SimpleCell> */}
				<FormItem
					bottom="автоматическое расписание полива зависит от типа цветка"
					htmlFor="custom-search-logic-select-id"
				>
					<CustomSearchLogicSelect
						id="custom-search-logic-select-id"
            currentChoosedFlower={cardModalData?.flowerName}
            existingFlowers={existingFlowers}
            handleCurrentFlowerChange = {cardModalData?.handleCurrentFlowerChange}
					/>
				</FormItem>
				<FormItem top="Расписание полива">
					<Select
						value={schedule}
						onChange={(e) => setSchedule(e.target.value)}
						options={[
							{label: 'Автоматически', value: '0'},
							{label: 'Один раз в неделю', value: '1'},
							{label: 'Два раза в неделю', value: '2'},
							{label: 'Три раза в неделю', value: '3'},
							{label: 'Четыре раза в неделю', value: '4'},
						]}
					/>
				</FormItem>
			</Group>
		</ModalPage>
	)
}
