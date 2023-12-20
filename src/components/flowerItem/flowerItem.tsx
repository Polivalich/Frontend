import React from 'react'
import {useModalStore} from '@/store'
import {Avatar, Div, SimpleCell} from '@vkontakte/vkui'

interface FlowerItemProps {
	battery?: number
	potName?: string
	potId?: string
	flowerName?: string
	flowerImg?: string
	waterLevel?: boolean
	schedule?: number
	handleCurrentFlowerChange?: (newFlower: string | any | undefined, potId: string | any) => void
	handleCurrentScheduleChange?: (potId: string, schedule: number) => void
}

const FlowerItem: React.FC<FlowerItemProps> = ({
	battery,
	potName,
	potId,
	flowerName,
	flowerImg,
	waterLevel,
	schedule,
	handleCurrentFlowerChange,
	handleCurrentScheduleChange,
}) => {
	const setModal = useModalStore.use.setModal()
	const setModalProps = useModalStore.use.setCardModalData()
	function handleButtonClick() {
		setModal('FlowerModal')
		setModalProps({
			potId,
			potName,
			battery,
			flowerName,
			waterLevel,
			schedule,
			handleCurrentFlowerChange,
			handleCurrentScheduleChange,
		})
	}

	React.useEffect(() => {}, [waterLevel])
	return (
		<SimpleCell
			onClick={handleButtonClick}
			before={
				<Avatar
					src={flowerImg}
					initials={flowerName}
					size={80}
				/>
			}
			after={`${battery}%`}
			subtitle={potName}
			multiline
		>
			{flowerName}
		</SimpleCell>
	)
}

export default FlowerItem
