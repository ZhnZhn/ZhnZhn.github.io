import { findGroup } from './LogicFn';

import WithLogicGroup from './WithLogicGroup';
import WithLogicList from './WithLogicList';
import WithLogicItem from './WithLogicItem';
import WithLogicDnD from './WithLogicDnD';

const Logic = {
  ...WithLogicGroup,
  ...WithLogicList,
  ...WithLogicItem,
  ...WithLogicDnD,
  findGroup
};

export default Logic
