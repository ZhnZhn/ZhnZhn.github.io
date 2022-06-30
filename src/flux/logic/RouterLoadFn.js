
import fnSelectN from '../creaters/selectN'
import fnStatN from '../creaters/statN'

import fnType3 from '../creaters/type3'
import fnType4 from '../creaters/type4'
import fnType5 from '../creaters/type5'

import fnUn5 from '../creaters/un5'

import fnFutures3 from '../creaters/futures3'
import fnFuturesWiki from '../creaters/futuresWiki'

import fnBigMac from '../creaters/bigMac'

const noopFn = () => {};

const _r = {
  BigMac: fnBigMac,

  DF: fnType3,
  DialogType3: fnType3,
  DialogType4: fnType4,
  DialogType4A: fnType4,
  DialogType5: fnType5,
  DialogType5A: fnType5,

  Futures3Dialog: fnFutures3,
  FuturesWikiDialog: fnFuturesWiki,

  DialogSelectN: fnSelectN,
  DialogQuery: fnSelectN,
  DialogStatN: fnStatN,

  UnDialog5: fnUn5,
  UnDialogAgg: fnUn5
};

const RouterLoadFn = {
  getFn : (loadFnType, dialogType) => loadFnType
    ? _r[loadFnType] || noopFn
    : dialogType && _r[dialogType] || _r.DF
};

export default RouterLoadFn
