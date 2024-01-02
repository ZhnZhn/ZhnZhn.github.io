import {
  ddList,
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

const _crListId = ({
  groupCaption,
  caption
}) => `${groupCaption};${caption};`

const hDragStartList = fDragStart(
  [DRAG.LIST, DRAG.GROUP],
  _crListId
);

const hDropList = (
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
};

const hDragEnterList = fDragEnter(
  DRAG.LIST,
  DRAG.C_LIST_ENTER
);

export const crDnDListHandlers = bindTo(
  crDnDHandlers,
  hDragStartList,
  hDropList,
  hDragEnterList,
  hDragOver,
  hDragLeave
)
