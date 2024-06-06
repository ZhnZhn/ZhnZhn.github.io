import { CL_ROW_TYPE2_TOPIC } from '../styleFn';

import {
  showDialogWatchItem,
  removeWatchItem
} from './Handlers';

import {
  crDnDItemHandlers
} from './dnd-handlers/DnDItemHandlers';

import WatchItem from './WatchItem';

const _isArr = Array.isArray
, CL_WATCH_ITEM = `${CL_ROW_TYPE2_TOPIC} stroke-black`;

const WatchItems = ({
  isModeEdit,
  items,
  groupCaption,
  listCaption
}) => _isArr(items) ? items
  .map(item => {
    const { caption } = item
    , option = {
      groupCaption,
      listCaption,
      caption
    };
    return (
       <WatchItem
          key={caption}
          className={CL_WATCH_ITEM}
          item={item}
          isDraggable={isModeEdit}
          option={option}
          dndHandlers={crDnDItemHandlers(isModeEdit, option)}
          onClick={showDialogWatchItem}
          onClose={removeWatchItem}
       />
    );
  }) : null;

export default WatchItems
