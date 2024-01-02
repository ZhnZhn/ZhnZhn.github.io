import {
  ddGroup,
  ddList
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

const _crGroupId = ({
  caption
}) => `${caption};`

const hDragStartGroup = fDragStart(
  [DRAG.GROUP],
  _crGroupId
);

const hDropGroup = (
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

const hDragEnterGroup = fDragEnter(
  DRAG.GROUP,
  DRAG.C_GROUP_ENTER
);

export const crDnDGroupHandlers = bindTo(
  crDnDHandlers,
  hDragStartGroup,
  hDropGroup,
  hDragEnterGroup,
  hDragOver,
  hDragLeave
)
