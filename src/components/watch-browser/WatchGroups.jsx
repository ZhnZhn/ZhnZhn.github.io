import {
  crDnDGroupHandlers
} from './dnd-handlers/DnDGroupHandlers';

import OpenClose from '../zhn/OpenClose';
import WatchLists from './WatchLists';

const _isArr = Array.isArray;

const WatchGroups = ({
  isModeEdit,
  groups
}) => _isArr(groups) ? groups
  .map(({caption, lists}) => (
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
  )) : null;

export default WatchGroups
