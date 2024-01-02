import {
  ddItem
} from '../../../flux/watch-list/watchListStore';

import { bindTo } from '../../uiApi';

import getTransferData from './getTransferData';
import DRAG from './WatchDnDConfig';

import {
  dropWithDnDStyle
} from './DnDStyleHandlers';
import {
  fDragStart,
  fDragEnter,
  hDragOver,
  hDragLeave,
  crDnDHandlers
} from './DnDHandlers';

const _crItemId = ({
  groupCaption,
  listCaption,
  caption
}) => `${groupCaption};${listCaption};${caption}`;

const hDragStartItem = fDragStart(
  [DRAG.ITEM, DRAG.LIST],
  _crItemId
);

const hDropItem = (
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

const hDragEnterItem = fDragEnter(
  DRAG.ITEM,
  DRAG.C_LIST_ENTER
);

export const crDnDItemHandlers = bindTo(
  crDnDHandlers,
  hDragStartItem,
  hDropItem,
  hDragEnterItem,
  hDragOver,
  hDragLeave
)
