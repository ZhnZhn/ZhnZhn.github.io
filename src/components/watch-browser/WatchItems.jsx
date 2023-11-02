import { CL_ROW_TYPE2_TOPIC } from '../styleFn';

import {
  showDialogWatchItem,
  removeWatchItem
} from './Handlers';

import {
  hDragStartItem,
  hDragOverItem,
  hDragEnterItem,
  hDragLeaveItem,
  hDropItem
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
    const { caption } = item;
    return (
       <WatchItem
          key={caption}
          className={CL_ROW_TYPE2_TOPIC}
          isDraggable={isModeEdit}
          item={item}
          option={{
            groupCaption,
            listCaption,
            caption
          }}
          onClick={showDialogWatchItem}
          onClose={removeWatchItem}
          onDragStart={hDragStartItem}
          onDragOver={hDragOverItem}
          onDragEnter={hDragEnterItem}
          onDragLeave={hDragLeaveItem}
          onDrop={hDropItem}
       />
    );
  }) : null;

export default WatchItems
