import {
  resolvePromise,
  logErrMsg
} from '../../routers/asyncFn';

import {
  crDialog,
  crOptionDialog
} from '../logic/Factory';

import { getDialogConf } from './getDialogConf';

export const showDialogImpl = (
  slice,
  { type, browserType, dialogConfOr }
) => slice[type]
 ? resolvePromise({ key: type })
 : crDialog(browserType, getDialogConf(dialogConfOr, type))
     .then(Comp => {
        slice[type] = true
        return { key:type, Comp };
     })
     .catch(logErrMsg);

export const showOptionDialogImpl = (
  slice,
  options
) => {
   const {
     type,
     data
   } = options;
   if (slice[type]) {
     return resolvePromise({ key: type, data });
   } else {
     options.dialogType = type
     return crOptionDialog(options)
        .then(Comp => {
            slice[type] = true
            return { key: type, Comp, data };
        })
        .catch(logErrMsg);
   }
}
