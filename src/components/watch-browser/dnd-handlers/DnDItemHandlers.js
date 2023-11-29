import {
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

const _crItemId = ({
  groupCaption,
  listCaption,
  caption
}) => `${groupCaption};${listCaption};${caption}`;

export const hDragStartItem = fDragStart(
  [DRAG.ITEM, DRAG.LIST],
  _crItemId
)

export const hDropItem = (
  //{groupCaption, listCaption, caption},
  options,
  evt
) => {
   dropWithDnDStyle(evt)
   const {
     xType,
     dragId
   } = getTransferData(evt)
   , dropId = _crItemId(options);

   if (xType === DRAG.ITEM) {
     if (dragId === dropId) {
       return;
    } else {
      evt.preventDefault()
      ddItem({ dragId, dropId })
    }
  }
};

export const hDragEnterItem = fDragEnter(
  DRAG.ITEM,
  DRAG.C_LIST_ENTER
)

export const hDragOverItem = hDragOver
export const hDragLeaveItem = hDragLeave
