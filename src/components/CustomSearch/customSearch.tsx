import React from 'react'

import {CustomSelect, CustomSelectOption} from '@vkontakte/vkui'
import {string} from 'zod'

interface CustomSearchLogicSelectProps {
	id: string
	currentChoosedFlower: string
	existingFlowers: {
		value: string
		label: string
	}[]
	handleCurrentFlowerChange: (flowerName: string, potId: string) => void
	potId: string
}

interface NewFlower {
	value: string
	label: string
}

const CustomSearchLogicSelect: React.FC<CustomSearchLogicSelectProps> = ({
	id,
	currentChoosedFlower,
	existingFlowers,
	handleCurrentFlowerChange,
	potId,
}) => {
	const [query, setQuery] = React.useState('')
	const [currentFlower, setCurrentFlower] = React.useState<string>(currentChoosedFlower)
	const [value, setValue] = React.useState('')
	const [newExistingFlowers, setNewExistingFlowers] = React.useState<NewFlower[]>([])

	React.useEffect(() => {
		existingFlowers.sort((flower1, flower2) => {
			if (flower1.label === currentFlower) {
				setValue(flower1.value)
				return -1
			} else if (flower2.label === currentFlower) {
				setValue(flower2.value)
				return 1
			} else {
				return 0
			}
		})

		setNewExistingFlowers([...existingFlowers])
	}, [])

	React.useEffect(() => {
		newExistingFlowers.forEach((flower) => {
			if (flower.value === value) {
				handleCurrentFlowerChange(flower.label, potId)
			}
		})
	}, [value])

	const customSearchOptions = () => {
		const options = [...newExistingFlowers]
		if (
			query.length > 0 &&
			!options.find((newExistingFlowers) => newExistingFlowers.value === query || newExistingFlowers.label === query)
		) {
			options.unshift({
				label: `Добавить свой ${query}`,
				value: '0',
			})
		}
		return options
	}

	const onCustomSearchChange = (e: any) => {
		if (e.target.value === '0') {
			setNewExistingFlowers([...newExistingFlowers, {label: query, value: query}])
			setValue(query)
		} else {
			setValue(e.target.value)
		}
		setQuery('')
	}

	const onCustomSearchInputChange = (e: any) => {
		setQuery(e.target.value)
		setCurrentFlower(e.target.label)
	}

	return (
		<CustomSelect
			id={id}
			value={value}
			placeholder="Меняем цветок?"
			searchable
			options={customSearchOptions()}
			onInputChange={onCustomSearchInputChange}
			renderOption={({option, ...restProps}) => (
				<CustomSelectOption
					style={option.value === '0' ? {color: 'var(--vkui--color_background_accent)'} : {}}
					{...restProps}
				>
					{option.label}
				</CustomSelectOption>
			)}
			onChange={onCustomSearchChange}
		/>
	)
}

export default CustomSearchLogicSelect
