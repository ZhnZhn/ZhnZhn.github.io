import { safeMap } from '../uiApi';
import { crMenuItemRole } from '../a11yFn';
import { S_OPEN_CLOSE_LEVEL_2 } from '../styleFn';

import { GREEN_COLOR } from '../styles/Color';

import { crDnDListHandlers } from './dnd-handlers/DnDListHandlers';

import OpenClose from '../zhn/OpenClose';
import WatchItems from './WatchItems';

const WatchLists = ({
  isModeEdit,
  groupCaption,
  lists
}) => safeMap(lists, ({ caption, items }) => (
  <OpenClose
     key={caption}
     {...crMenuItemRole()}     
     style={S_OPEN_CLOSE_LEVEL_2}
     openColor={GREEN_COLOR}
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
