import {FC, Fragment} from 'react'

import {Icon28HomeOutline, Icon28InfoOutline} from '@vkontakte/icons'

import {LayoutButton} from './button'
import {URL} from '@/router'

type LayoutNavProps = {
	mode: 'cell' | 'tabbarItem'
}

export const LayoutNav: FC<LayoutNavProps> = ({mode}) => (
	<Fragment>
		<LayoutButton
			mode={mode}
			story={URL.homePanel}
			before={<Icon28HomeOutline />}
		>
			Главная
		</LayoutButton>
		<LayoutButton
			mode={mode}
			story={URL.infoPanel}
			before={<Icon28InfoOutline />}
		>
			О приложении
		</LayoutButton>
	</Fragment>
)
