import { FC } from 'react'

import { Icon56InfoOutline } from '@vkontakte/icons'
import { Button, ModalCard, NavIdProps } from '@vkontakte/vkui'
import { useModalStore } from '@/store'

export const ErrorConnectionModal: FC<NavIdProps> = (props) => {
  const clearModal = useModalStore.use.clearModal()

  return (
    <ModalCard
      {...props}
      onClose={clearModal}
      icon={<Icon56InfoOutline />}
      header="При подключении прооизошла ошибка"
      subheader="Проверьте правильность введенных данных"
      actions={
        <Button size="l" mode="primary" stretched onClick={clearModal} style={{backgroundColor: "#889f76"}}>
          Ура!
        </Button>
      }
    />
  )
}
