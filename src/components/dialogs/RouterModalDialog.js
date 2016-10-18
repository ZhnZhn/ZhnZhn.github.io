
import { ModalDialog } from '../../constants/Type';

import InfoDialog from './InfoDialog';
import AlertDialog from './AlertDialog';
import DescriptionDialog from './DescriptionDialog';
import CustomizeExportDialog from './CustomizeExportDialog';
import SettingsDialog from '../header/SettingsDialog';
import AddToWatchDialog from '../watch-browser/AddToWatchDialog';
import LoadItemDialog from '../watch-browser/LoadItemDialog';
import UsStocksBySectorDialog from './UsStocksBySectorDialog';
import EditGroupDialog from '../watch-browser/EditGroupDialog';
import EditListDialog from '../watch-browser/EditListDialog';

const RouterModalDialog = {
  [ModalDialog.INFO] : InfoDialog,
  [ModalDialog.ALERT] : AlertDialog,
  [ModalDialog.DESCRIPTION] : DescriptionDialog,
  [ModalDialog.CUSTOMIZE_EXPORT] : CustomizeExportDialog,
  [ModalDialog.SETTINGS] : SettingsDialog,
  [ModalDialog.ADD_TO_WATCH] : AddToWatchDialog,
  [ModalDialog.LOAD_ITEM] : LoadItemDialog,
  [ModalDialog.US_STOCK_BY_SECTOR] : UsStocksBySectorDialog,
  [ModalDialog.EDIT_WATCH_GROUP] : EditGroupDialog,
  [ModalDialog.EDIT_WATCH_LIST] : EditListDialog
}

export default RouterModalDialog
