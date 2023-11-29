import {
  ddList,
  ddItem
} from '../../../flux/watch-list/watchListStore';

import getTransferData from './getTransferData';
import DRAG from './WatchDnDConfig';

import {
  dropWithDnDStyle
} from './DnDStyleHandlers';
import {
  fDragStart,
  fDragEnter,
  hDragOver,
  hDragLeave
} from './DnDHandlers';

const _crListId = ({
  groupCaption,
  caption
}) => `${groupCaption};${caption};`

export const hDragStartList = fDragStart(
  [DRAG.LIST, DRAG.GROUP],
  _crListId
)

export const hDropList = (
  //{groupCaption, caption},
  options,
  evt
 ) => {
  dropWithDnDStyle(evt)
  const {
   xType,
   dragId
 } = getTransferData(evt)
  , dropId = _crListId(options);

  if (xType === DRAG.LIST) {
    if (dragId === dropId) {
      return;
    } else {
      evt.preventDefault()
      ddList({ dragId, dropId })
    }
  } else if (xType === DRAG.ITEM) {
    evt.preventDefault()
    ddItem({ dragId, dropId })    
  }
}

export const hDragEnterList = fDragEnter(
  DRAG.LIST,
  DRAG.C_LIST_ENTER
)

export const hDragOverList = hDragOver
export const hDragLeaveList = hDragLeave
