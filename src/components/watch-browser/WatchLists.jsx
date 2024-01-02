import {  
  crDnDListHandlers
} from './dnd-handlers/DnDListHandlers';

import Comp from '../Comp';
import WatchItems from './WatchItems';

const { OpenClose2 } = Comp
, _isArr = Array.isArray
, C_LIST_OPEN = '#80c040'
, S_LIST_DIV = {
  marginLeft: 8,
  paddingLeft: 2,
  borderLeftStyle: 'solid',
  borderLeftWidth: 2,
  borderLeftColor: 'inherit',
  lineHeight: 2
}
, S_MR_10 = { marginRight: 10 };

const WatchLists = ({
  isModeEdit,
  groupCaption,
  lists
}) => _isArr(lists) ? lists
  .map(({ caption, items }) => (
    <OpenClose2
       key={caption}
       style={S_LIST_DIV}
       notSelectedStyle={S_MR_10}
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
    </OpenClose2>
  )) : null;

export default WatchLists
