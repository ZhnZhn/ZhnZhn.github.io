import { crRouter } from './LogicFn';

import fnSelectN from '../creaters/selectN';
import fnStatN from '../creaters/statN';

import fnUn5 from '../creaters/un5';

const FN_NOOP = () => {};

const _r = crRouter({
  DF: fnSelectN,

  DialogSelectN: fnSelectN,
  DialogQuery: fnSelectN,
  DialogStatN: fnStatN,

  UnDialog5: fnUn5,
  UnDialogAgg: fnUn5
});

const RouterLoadFn = {
  getFn : (loadFnType, dialogType) => loadFnType
    ? _r[loadFnType] || FN_NOOP
    : dialogType && _r[dialogType] || _r.DF
};

export default RouterLoadFn
