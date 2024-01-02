import { bindTo } from '../../uiApi';
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

export const crDnDHandlers = (
  onDragStart,
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave,
  isEditMode,
  option,
) => isEditMode
 ? {
    draggable: true,
    onDragStart: bindTo(onDragStart, option),
    onDrop: bindTo(onDrop, option),
    onDragEnter,
    onDragOver,
    onDragLeave
  }
 : void 0
