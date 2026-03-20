import {
  resolvePromise,
  logErrMsg
} from '../../utils/asyncFn';

import {
  crDialog,
  crOptionDialog
} from '../logic/Factory';

import { getSourceConfig } from './browserLogic';

export const getDialogConf = (conf, chartType) => {
  //DialogStatN
  if (conf && conf.dialogConf) {
    return conf;
  }
  const _browserId = chartType.split('_')[0];
  return getSourceConfig(_browserId, chartType);
}

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
