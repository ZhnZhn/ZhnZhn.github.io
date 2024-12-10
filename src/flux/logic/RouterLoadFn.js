import { crGetRoute } from '../../utils/crRouter';

import fnSelectN from '../creaters/selectN';
import fnStatN from '../creaters/statN';

import fnUn5 from '../creaters/un5';

const FN_NOOP = () => {};
const _getLoadFn = crGetRoute({
  DialogSelectN: fnSelectN,
  DialogQuery: fnSelectN,
  DialogStatN: fnStatN,

  UnDialog5: fnUn5,
  UnDialogAgg: fnUn5
});

export const getLoadFn = (
  loadFnType,
  dialogType
) => loadFnType
  ? _getLoadFn(loadFnType) || FN_NOOP
  : _getLoadFn(dialogType) || fnSelectN
