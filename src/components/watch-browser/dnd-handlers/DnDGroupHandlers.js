import {
  ddGroup,
  ddList
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

const _crGroupId = ({
  caption
}) => `${caption};`

export const hDragStartGroup = fDragStart(
  [DRAG.GROUP],
  _crGroupId
)

export const hDropGroup = (
  //{ caption },
  options,
  evt
) => {
  dropWithDnDStyle(evt)
  const {
    xType,
    dragId
  } = getTransferData(evt)
  , dropId = _crGroupId(options);

  if (xType === DRAG.GROUP) {
    if (dragId === dropId) {
      return;
    } else {
      evt.preventDefault()
      ddGroup({ dragId, dropId })
    }
  } else if (xType === DRAG.LIST) {
    evt.preventDefault()
    ddList({ dragId, dropId })
  }
};

export const hDragEnterGroup = fDragEnter(
  DRAG.GROUP,
  DRAG.C_GROUP_ENTER
)

export const hDragOverGroup = hDragOver
export const hDragLeaveGroup = hDragLeave
