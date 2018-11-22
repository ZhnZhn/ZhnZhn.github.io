import ComponentActions from './ComponentActions';
import { ModalDialog } from '../../constants/Type';

export const showCustomizeExportDialog = ComponentActions
 .showModalDialog
 .bind(null, ModalDialog.CUSTOMIZE_EXPORT);
