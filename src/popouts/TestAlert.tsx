import {FC} from 'react'

import {Alert, NavIdProps} from '@vkontakte/vkui'
import {usePopoutStore} from '@/store'

export const TestAlert: FC<NavIdProps> = () => {
	const clearPopout = usePopoutStore.use.clearPopout()

	return (
		<Alert
			actions={[
				{
					title: 'Отмена',
					autoClose: true,
					mode: 'cancel',
				},
				{
					title: 'Да',
					autoClose: true,
					mode: 'default',
				},
			]}
			actionsLayout="horizontal"
			onClose={clearPopout}
			header="А тут ничего нет"
			text="Но очень скоро появится!"
		/>
	)
}
