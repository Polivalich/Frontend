import {Group, GroupProps} from '@vkontakte/vkui'
import React from 'react'
import {ContentPanel} from './contentPanel'

//isPanelNav показывает, что нам нужно бдуте отрисовать и меню навигации
// Чисто логически, если нет isPanelNav, то должна быть кнопка назад
// но мэтчить все это нужно на уровне выше
interface ContentParams extends GroupProps {
	isPanelNav?: boolean
}

export const Content = ({children, isPanelNav = false, ...props}: ContentParams) => {
	return (
		<>
			{isPanelNav && <ContentPanel />}
			<Group {...props}>{children}</Group>
		</>
	)
}
