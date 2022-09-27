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

const _isArr = Array.isArray
, CL_WATCH_ITEM = 'row__type2-topic not-selected';

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
          className={CL_WATCH_ITEM}
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
