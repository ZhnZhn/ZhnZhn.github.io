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

export const showItemDialog = (
  slice,
  { type, browserType, dialogConfOr }
) => slice[type]
 ? Promise.resolve({ key: type })
 : crDialog(browserType, getDialogConf(dialogConfOr, type))
     .then(Comp => {
        slice[type] = true
        return { key:type, Comp };
   });

export const showOptionDialog = (
  slice,
  options
) => {
   const {
     type,
     data
   } = options;
   if (slice[type]) {
     return Promise.resolve({ key: type, data });
   } else {
     options.dialogType = type
     return crOptionDialog(options)
        .then(Comp => {
            slice[type] = true
            return { key: type, Comp, data };
        })
   }
}
