import { CL_ROW_TYPE2_TOPIC } from '../styleFn';

import {
  showDialogWatchItem,
  removeWatchItem
} from './Handlers';

import {
  crDnDItemHandlers
} from './dnd-handlers/DnDItemHandlers';

import WatchItem from './WatchItem';

const _isArr = Array.isArray;

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
          className={CL_ROW_TYPE2_TOPIC}
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
