import React from 'react'
import {useModalStore} from '@/store'
import {Div} from '@vkontakte/vkui'

interface FlowerItemProps {
	battery?: number
	potName?: string
	potId?: number
	flowerName?: string
	flowerImg?: string
  waterLevel?: boolean
  schedule?: number
  handleCurrentFlowerChange?: (newFlower: string | any | undefined) => void
}


const FlowerItem: React.FC<FlowerItemProps> = ({battery, potName, potId, flowerName, flowerImg, waterLevel, schedule, handleCurrentFlowerChange}) => {
	const setModal = useModalStore.use.setModal()
	const setModalProps = useModalStore.use.setCardModalData()
	function handleButtonClick() {
		setModal('FlowerModal')
		setModalProps({potId, potName, battery, flowerName, waterLevel, schedule, handleCurrentFlowerChange})
	}

  React.useEffect(() => {

  }, [waterLevel])
	return (
		<Div className="flower_card">
			<img
				src={flowerImg}
				alt={flowerName}
				className="flower_img"
			/>
			<div className="flower_content">
				<div className="flower_card_header">
					<h3 className="flower_card_title">{flowerName}</h3>
					<p className="flower_card_power">Уровень заряда: {battery}</p>
				</div>
				<div className="flower_card_bottom">
					<p>{potName}</p>
					<button
						className="flower__btn"
						onClick={handleButtonClick}
					></button>
				</div>
			</div>
		</Div>
	)
}

export default FlowerItem
