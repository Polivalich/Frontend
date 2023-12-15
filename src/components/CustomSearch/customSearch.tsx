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
	handleCurrentFlowerChange: (flowerName: string) => void
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
}) => {
	const [query, setQuery] = React.useState('0')
	const [currentFlower, setCurrentFlower] = React.useState<string>(currentChoosedFlower)
	const [value, setValue] = React.useState(currentFlower)
	const [currentValue, setCurrentValue] = React.useState('')
	const [newExistingFlowers, setNewExistingFlowers] = React.useState<NewFlower[]>([])

	React.useEffect(() => {
		const filteredFlowers = existingFlowers.filter((flower) => {
			setCurrentValue(value)
			return flower.label !== currentFlower
		})
		filteredFlowers.unshift({
			value: currentValue,
			label: currentFlower,
		})
		setNewExistingFlowers([...filteredFlowers])
	}, [])

	React.useEffect(() => {
		newExistingFlowers.forEach((flower) => {
			if (flower.value === value && flower.value !== '') {
				handleCurrentFlowerChange(flower.label)
				console.log(value, flower.label)
			}
		})
	}, [currentFlower])

	const customSearchOptions = () => {
		const options = [...newExistingFlowers]
		console.log(options)
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
