
import { ModalDialog } from '../../constants/Type';

import AskDialog from './AskDialog';
import ReloadDialog from './ReloadDialog';
import InfoDialog from './InfoDialog';
import AlertDialog from './AlertDialog';
import DescriptionDialog from './DescriptionDialog';
import CustomizeExportDialog from './CustomizeExportDialog';
import SettingsDialog from '../header/SettingsDialog';
import AddToWatchDialog from '../watch-browser/AddToWatchDialog';
import LoadItemDialog from '../watch-browser/LoadItemDialog';
import UsStocksBySectorDialog from './UsStocksBySectorDialog';
import StocksBySectorDialog from './StocksBySectorDialog';
import EditGroupDialog from '../watch-browser/EditGroupDialog';
import EditListDialog from '../watch-browser/EditListDialog';

import PasteToModalDialog from '../items/PasteToModalDialog'

const RouterModalDialog = {
  [ModalDialog.ASK] : AskDialog,
  [ModalDialog.RELOAD] : ReloadDialog,
  [ModalDialog.INFO] : InfoDialog,
  [ModalDialog.ALERT] : AlertDialog,
  [ModalDialog.DESCRIPTION] : DescriptionDialog,
  [ModalDialog.CUSTOMIZE_EXPORT] : CustomizeExportDialog,
  [ModalDialog.SETTINGS] : SettingsDialog,
  [ModalDialog.ADD_TO_WATCH] : AddToWatchDialog,
  [ModalDialog.LOAD_ITEM] : LoadItemDialog,
  [ModalDialog.US_STOCK_BY_SECTOR] : UsStocksBySectorDialog,
  [ModalDialog.STOCKS_BY_SECTOR] : StocksBySectorDialog,
  [ModalDialog.EDIT_WATCH_GROUP] : EditGroupDialog,
  [ModalDialog.EDIT_WATCH_LIST] : EditListDialog,
  [ModalDialog.PASTE_TO]: PasteToModalDialog
}

export default RouterModalDialog
