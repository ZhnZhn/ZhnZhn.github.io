
import fnType3 from '../creaters/type3'
import fnType4 from '../creaters/type4'
import fnType5 from '../creaters/type5'

import fnFutures3 from '../creaters/futures3'
import fnFuturesWiki from '../creaters/futuresWiki'

import fnBigMac from '../creaters/bigMac'

const noopFn = () => {}

const _r = {
  BigMac: fnBigMac,

  DEFAULT: fnType3,
  DialogType3: fnType3,
  DialogType4: fnType4,
  DialogType4A: fnType4,
  DialogType5: fnType5,

  Futures3Dialog: fnFutures3,
  FuturesWikiDialog: fnFuturesWiki
}

const RouterLoadFn = {
   getFn : (loadFnType, dialogType) => {
      if (loadFnType) {
        if (_r[loadFnType]){
          return _r[loadFnType];
        } else {
          return noopFn;
        }
      } else if (dialogType && _r[dialogType]){
        return _r[dialogType];
      } else {
        return _r.DEFAULT;
      }
   }
}

export default RouterLoadFn
