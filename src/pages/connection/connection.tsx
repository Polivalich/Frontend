import {NavIdProps, Panel, PanelHeader, PanelHeaderBack, Spacing} from '@vkontakte/vkui'
import {FC, useEffect, useState} from 'react'
import './connection.css'
import {useRouteNavigator, useFirstPageCheck} from '@vkontakte/vk-mini-apps-router'
import {useForm, SubmitHandler} from 'react-hook-form'
import {ConnectionStateType, ConnectionForm} from '@/models/api'
import {PotService} from '@/services/PotService'
import {useModalStore} from '@/store'

export const Connection: FC<NavIdProps> = (props) => {
	const router = useRouteNavigator()
	const isFirstPage = useFirstPageCheck()

	const [connectionState, setConnectionState] = useState<ConnectionStateType>('waiting')

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<ConnectionForm>()

	const setModal = useModalStore.use.setModal()
	const onSubmit: SubmitHandler<ConnectionForm> = async (data) => {
		try {
			const res = await PotService.connect(data)
			setConnectionState(res.data.status)
		} catch (error) {
			console.error('error happened', error)
			setConnectionState('failed')
		}
		console.log('sending request for connection', data)
	}

	useEffect(() => {
		if (connectionState == 'connected') {
			console.info('Вы успешно приконнектились! ура')
			setModal('SuccessConnection')
		}
		if (connectionState == 'failed') {
			console.info('Вы успешно приконнектились! ура')
			setModal('ErrorConnection')
		}
	}, [connectionState])

	return (
		<Panel
			{...props}
			className="connection_panel"
		>
			<PanelHeader before={<PanelHeaderBack onClick={() => (isFirstPage ? router.push('/') : router.back())} />}>
				Соединение с горшком
			</PanelHeader>
			<div className="connection_screen">
				<div className="connection_content">
					<p>Введите имя и пароль от вашей Wi-fi сети, чтобы горшок смог с вами общатсья</p>
					<form
						className="connection_form"
						onSubmit={(e) => {
							e.preventDefault()
							handleSubmit(onSubmit)()
						}}
					>
						<input
							className="connection_input"
							placeholder="Название Wi-fi сети"
							{...register('login', {required: true})}
						/>

						<input
							className="connection_input"
							placeholder="Пароль Wi-fi сети"
							{...register('password', {required: true})}
						/>

						<button
							className="connection_button"
							type="submit"
						>Подключиться</button>
					</form>
					<div>{connectionState !== 'waiting' && connectionState}</div>
				</div>
			</div>
			<Spacing size={8}></Spacing>
		</Panel>
	)
}
