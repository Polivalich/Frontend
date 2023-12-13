import {URL} from '@/router'
import {useUserStore} from '@/store'
import {Icon28SlidersOutline} from '@vkontakte/icons'
import {useRouteNavigator} from '@vkontakte/vk-mini-apps-router'
import {Avatar, Group, GroupProps} from '@vkontakte/vkui'
import './content.css'

export const ContentPanel = ({className, ...props}: GroupProps) => {
	const user = useUserStore.use.user()
	const router = useRouteNavigator()

	return (
		<Group
			className={className ? className : 'contentPanelWrapper'}
			{...props}
		>
			<div className="contentPanel">
				{/* <Icon28SlidersOutline
					onClick={() => router.push(URL.filtersPanel)}
					style={{cursor: 'pointer'}}
				/> */}
				<Avatar
					src={user?.photo_100}
					size={36}
					onClick={() => router.push(URL.personalPanel)}
					style={{cursor: 'pointer'}}
				/>
			</div>
		</Group>
	)
}
