import {FC} from 'react'

import {useActionRef} from '@/hooks'
import {ActionSheet, ActionSheetItem, NavIdProps, ScreenSpinner} from '@vkontakte/vkui'
import {usePopoutStore, useSnackbarStore} from '@/store'
import {TestPayload, testValidation} from '@/models'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import {ApiService} from '@/services'
import {ErrorSnackbar, SuccessSnackbar} from '@/components'

export const TestActionSheet: FC<NavIdProps> = () => {
	const {actionRef} = useActionRef()
	const clearPopout = usePopoutStore.use.clearPopout()
	const setPopout = usePopoutStore.use.setPopout()
	const setSnackbar = useSnackbarStore.use.setSnackbar()

	// Функция чтобы увидеть спиннер
	function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms))
	}

	const queryClient = useQueryClient()
	const {isLoading, isError, data, mutate} = useMutation({
		mutationKey: ['test'],
		mutationFn: (testPayload: TestPayload) => {
			setPopout(<ScreenSpinner state="loading" />)
			return sleep(1000).then(() => ApiService.test(testPayload))
		},
		onSuccess: (data) => {
			console.log(data)
			setSnackbar(<SuccessSnackbar>Вы успешно отметились на мероприятии!</SuccessSnackbar>)
		},
		onError: (error) => {
			console.error('there was an error', error)
			setSnackbar(<ErrorSnackbar>Что-то пошло не так...</ErrorSnackbar>)
		},
		onSettled: () => {
			setPopout(null)
			queryClient.invalidateQueries({queryKey: ['test']})
		},
	})

	// Мы имеем возможность использовать функцию mutate в люой части кода
	// isLoading можно использовать для отрисовки лоадера
	// data для отображения результата
	const testRequest = (payload: TestPayload) => {
		if (!testValidation.safeParse(payload).success) {
			return setSnackbar(<SuccessSnackbar>Супер!</SuccessSnackbar>)
		}
		mutate(payload)
	}

	return (
		<ActionSheet
			onClose={clearPopout}
			iosCloseItem={
				<ActionSheetItem
					autoClose
					mode="cancel"
				>
					Отменить
				</ActionSheetItem>
			}
			toggleRef={actionRef}
		>
			<ActionSheetItem
				autoClose
				onClick={() => testRequest({email: 'rikk@gmail.com'})}
			>
				Отправить запрос к API
			</ActionSheetItem>
			<ActionSheetItem
				autoClose
				onClick={() => testRequest({email: 'rikkgmailcom'})}
			>
				Отправить невалидные данные к API
			</ActionSheetItem>
			<ActionSheetItem
				autoClose
				mode="destructive"
			>
				Опасное действие
			</ActionSheetItem>
		</ActionSheet>
	)
}
