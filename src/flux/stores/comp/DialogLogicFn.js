import {
  crDialog,
  crOptionDialog
} from '../../logic/Factory';

export const showItemDialog = (
  store,
  slice,
  { type, browserType, dialogConfOr }
) => slice[type]
 ? Promise.resolve({ key: type })
 : crDialog(browserType, store.getDialogConf(dialogConfOr, type))
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
