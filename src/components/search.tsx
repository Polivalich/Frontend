import {Cell, Group, Search, useAppearance} from '@vkontakte/vkui'
import {useEffect, useState} from 'react'
import {mockSearchData} from '@/models'

// Интпут. Пишу текст. с задержкой отсылаю запрос Кириллу. Они мне присылает ТИП1: Упрощенная инфа, только названия
// Когда кликаю, то отсылается запрос на подробную информацию об объекте, Она отображается в нижней части.

// Лэйаут будет менять в зависимости от того, где мы находимся

//

export const SimpleSearch = ({mobile}: any) => {
	const [visibleQ, setVisibleQ] = useState<string>("")
	const [searchRes, setSearchRes] = useState<mockSearchData[]>([])
	const appearance = useAppearance()

	const data: mockSearchData[] = [
		{
			data: 1,
			name: "Георгины"
		},
		{
			data: 2,
			name: "Розы"
		},
		{
			data: 3,
			name: "Ромашки"
		},
		{
			data: 4,
			name: "Астры"
		},

	]

	const fakeData = () => data.filter((item) => item.name.toLowerCase().indexOf(visibleQ.toLowerCase()) > -1)

	useEffect(() => {
		const TypingDelay = 100
		let timer = setTimeout(() => {
			if (visibleQ) {
				setVisibleQ(visibleQ)
				setSearchRes(fakeData())
			} else {
				setSearchRes([])
			}
		}, TypingDelay)

		return () => clearTimeout(timer)
	}, [visibleQ])

	const pick = (res: any) => {
		console.log(res)
		setVisibleQ('')
	}

	return (
		<Group
			id="searchField"
			separator="hide"
			style={{maxWidth: mobile ? '100%' : '50%', padding: 0}}
		>
			<Search
				// noPadding={true}
				value={visibleQ}
				onChange={(e) => setVisibleQ(e.target.value)}
			/>
			{searchRes.length > 0 &&
				searchRes.map((res: mockSearchData) => (
					<Cell
						onClick={() => pick(res)}
						style={{backgroundColor: appearance === 'dark' ? '#19191A' : 'white'}}
						key={res.data}
					>
						{res.name}
					</Cell>
				))}
			{searchRes.length === 0 && !!visibleQ.length && (
				<Cell
					disabled
					style={{backgroundColor: appearance === 'dark' ? '#19191A' : 'white'}}
				>
					Ничего не найдено
				</Cell>
			)}
		</Group>
	)
}
