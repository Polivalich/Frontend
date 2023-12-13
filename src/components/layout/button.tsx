import {FC, ReactNode} from 'react'

import {Cell, TabbarItem} from '@vkontakte/vkui'
import {useActiveVkuiLocation, useRouteNavigator} from '@vkontakte/vk-mini-apps-router'

type LayoutButtonProps = {
	mode: 'cell' | 'tabbarItem'
	story: string
	before: ReactNode
	children: ReactNode
}

export const LayoutButton: FC<LayoutButtonProps> = ({mode, story, before, children}) => {
	const {view: activeView, panel: activePanel} = useActiveVkuiLocation()

	const selected = story === activeView

	const router = useRouteNavigator()

	const onClick = () => {
		// INFO: Похоже на нативное поведение
		if (activeView === story) {
			if (window.scrollY !== 0) {
				return window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth',
				})
			}

			if (activePanel === '/') return
		}

		router.push(story)
	}

	const activeStoryStyles = {
		backgroundColor: 'var(--vkui--color_background_secondary)',
		borderRadius: 8,
	}

	return mode === 'cell' ? (
		<Cell
			key={story}
			before={before}
			style={selected ? activeStoryStyles : undefined}
			onClick={onClick}
		>
			{children}
		</Cell>
	) : (
		<TabbarItem
			key={story}
			selected={selected}
			text={children}
			onClick={onClick}
		>
			{before}
		</TabbarItem>
	)
}
