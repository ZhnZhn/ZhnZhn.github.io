
import LogicFn from './LogicFn';

import WithLogicGroup from './WithLogicGroup';
import WithLogicList from './WithLogicList';
import WithLogicItem from './WithLogicItem';
import WithLogicDnD from './WithLogicDnD';

const Logic = {

  ...WithLogicGroup,
  ...WithLogicList,
  ...WithLogicItem,

  ...WithLogicDnD,

  findGroup : LogicFn.findGroup

};

export default Logic
