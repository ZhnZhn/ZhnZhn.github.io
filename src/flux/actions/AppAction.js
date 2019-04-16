import ComponentActions from './ComponentActions';
import { ModalDialog } from '../../constants/Type';

export const showCustomizeExportDialog = ComponentActions
  .showModalDialog
  .bind(null, ModalDialog.CUSTOMIZE_EXPORT);

export const showErrDialog = (msg, caption) => {  
  ComponentActions
    .showModalDialog(ModalDialog.ALERT, {
       alertDescr: msg,
       alertCaption: caption
    })
};
