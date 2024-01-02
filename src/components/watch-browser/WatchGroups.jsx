import {
  crDnDGroupHandlers
} from './dnd-handlers/DnDGroupHandlers';

import Comp from '../Comp';
import WatchLists from './WatchLists';

const { OpenClose2 } = Comp
, _isArr = Array.isArray
, S_GROUP_DIV = { lineHeight: 2 };

const WatchGroups = ({
  isModeEdit,
  groups
}) => _isArr(groups) ? groups
  .map(({caption, lists}) => (
      <OpenClose2
         key={caption}
         style={S_GROUP_DIV}
         caption={caption}
         dndHandlers={crDnDGroupHandlers(isModeEdit, {caption})}
       >
         <WatchLists
           isModeEdit={isModeEdit}
           groupCaption={caption}
           lists={lists}
         />
       </OpenClose2>
  )) : null;

export default WatchGroups
