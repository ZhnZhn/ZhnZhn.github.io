import setTransferTo from './setTransferTo';

import {
  dragStartWithDnDStyle,
  dragEnterWithDnDStyle,
  dragLeaveWithDnDStyle
} from './DnDStyleHandlers';

export const fDragStart = (
  permissions,
  crDragId
) => (options, event) => {
  dragStartWithDnDStyle(event, permissions)
  setTransferTo({
    event,
    dragId: crDragId(options),
    xType: permissions[0]
  })
}

export const fDragEnter = (
  sourceType,
  borderColor
) => event => {
   event.preventDefault()
   dragEnterWithDnDStyle(
     event,
     sourceType,
     borderColor
   )
}

export const hDragOver = event => {
   event.preventDefault()
}

export const hDragLeave = ev => {
   ev.preventDefault()
   dragLeaveWithDnDStyle(ev)
}
