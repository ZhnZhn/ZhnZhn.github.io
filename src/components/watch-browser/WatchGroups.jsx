import { safeMap } from '../uiApi';
import { crDnDGroupHandlers } from './dnd-handlers/DnDGroupHandlers';

import OpenClose from '../zhn/OpenClose';
import WatchLists from './WatchLists';

const WatchGroups = ({
  isModeEdit,
  groups
}) => safeMap(groups, ({ caption, lists }) => (
  <OpenClose
     key={caption}
     role="menuitem"
     caption={caption}
     dndHandlers={crDnDGroupHandlers(isModeEdit, {caption})}
   >
     <WatchLists
       isModeEdit={isModeEdit}
       groupCaption={caption}
       lists={lists}
     />
   </OpenClose>
))

export default WatchGroups
