import { safeMap } from '../uiApi';
import { crDnDListHandlers } from './dnd-handlers/DnDListHandlers';

import OpenClose from '../zhn/OpenClose';
import WatchItems from './WatchItems';

const C_LIST_OPEN = '#80c040'
, S_OPEN_CLOSE_ROW = {
  marginLeft: 8,
  borderLeft: `solid 2px ${C_LIST_OPEN}`
}
, S_MR_10 = { marginRight: 10 };

const WatchLists = ({
  isModeEdit,
  groupCaption,
  lists
}) => safeMap(lists, ({ caption, items }) => (
  <OpenClose
     key={caption}
     role="menuitem"
     rowStyle={S_OPEN_CLOSE_ROW}
     ocStyle={S_MR_10}
     openColor={C_LIST_OPEN}
     caption={caption}
     dndHandlers={crDnDListHandlers(isModeEdit, {groupCaption, caption})}
  >
    <WatchItems
      isModeEdit={isModeEdit}
      items={items}
      groupCaption={groupCaption}
      listCaption={caption}
    />
  </OpenClose>
))

export default WatchLists
