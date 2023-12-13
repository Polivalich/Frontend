import {MouseEventHandler, useCallback, MouseEvent} from 'react'

let actionRef: Element | null = null

export function useActionRef(handler?: (e: Element | null) => void) {
	let setActionRef = useCallback(
		(el: Element | null) => {
			actionRef = el
			if (handler) handler(actionRef)
		},
		[handler],
	)

	let setActionRefHandler: MouseEventHandler<HTMLElement> = useCallback(
		(e: MouseEvent<HTMLElement> | undefined) => {
			actionRef = e?.target as Element
			if (handler) handler(actionRef)
		},
		[handler],
	)

	return {actionRef, setActionRef, setActionRefHandler}
}
