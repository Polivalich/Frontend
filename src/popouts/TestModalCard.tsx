import { FC } from 'react'

import { Icon56GhostOutline } from '@vkontakte/icons'
import { Button, ModalCard, NavIdProps } from '@vkontakte/vkui'
import { useModalStore } from '@/store'

export const TestModalCard: FC<NavIdProps> = (props) => {
  const clearModal = useModalStore.use.clearModal()

  return (
    <ModalCard
      {...props}
      onClose={clearModal}
      icon={<Icon56GhostOutline />}
      header="Открывайте новые модальные карточки"
      subheader="Чем больше нажатий, тем меньше смысла"
      actions={
        <Button size="l" mode="primary" stretched onClick={clearModal}>
          Больше не буду
        </Button>
      }
    />
  )
}
