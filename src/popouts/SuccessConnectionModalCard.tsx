import { FC } from 'react'

import { Icon56CheckCircleOutline } from '@vkontakte/icons'
import { Button, ModalCard, NavIdProps } from '@vkontakte/vkui'
import { useModalStore } from '@/store'

export const SuccessConnectionModalCard: FC<NavIdProps> = (props) => {
  const clearModal = useModalStore.use.clearModal()

  return (
    <ModalCard
      {...props}
      onClose={clearModal}
      icon={<Icon56CheckCircleOutline />}
      header="Вы успешно подключились к горшку!"
      subheader="Можете снова подключаться к своему Wi-fi"
      actions={
        <Button size="l" mode="primary" stretched onClick={clearModal} style={{backgroundColor: "#889f76"}}>
          Ура!
        </Button>
      }
    />
  )
}
