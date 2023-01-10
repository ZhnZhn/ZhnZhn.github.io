import {
  BT_WATCH_LIST
} from '../../constants/BrowserType';
import {
  MDT_ASK,
  MDT_RELOAD,
  MDT_INFO,
  MDT_ALERT,
  MDT_DESCRIPTION,
  MDT_CUSTOMIZE_EXPORT,
  MDT_COLUMN_RANGE,
  MDT_ZOOM,
  MDT_SETTINGS,
  MDT_ADD_TO_WATCH,
  MDT_STOCKS_BY_SECTOR,
  MDT_PASTE_TO,

  MDT_LOAD_ITEM,
  MDT_EDIT_WATCH_GROUP,
  MDT_EDIT_WATCH_LIST
} from '../../constants/ModalDialogType';

import AskDialog from './AskDialog';
import ReloadDialog from './ReloadDialog';
import InfoDialog from './InfoDialog';
import AlertDialog from './AlertDialog';
import DescriptionDialog from './DescriptionDialog';
import CustomizeExportDialog from './CustomizeExportDialog';
import ColumnRangeDialog from './ColumnRangeDialog'
import ZoomDialog from './ZoomDialog'
import StocksBySectorDialog from './StocksBySectorDialog';
import SettingsDialog from '../header/SettingsDialog';
import AddToWatchDialog from '../watch-browser/AddToWatchDialog';

import PasteToModalDialog from '../dialogs-modal/PasteToModalDialog';

const MSG_OFFLINE = 'It seems you are offline';

const _router = {
  [MDT_ASK]: AskDialog,
  [MDT_RELOAD]: ReloadDialog,
  [MDT_INFO]: InfoDialog,
  [MDT_ALERT]: AlertDialog,
  [MDT_DESCRIPTION]: DescriptionDialog,
  [MDT_CUSTOMIZE_EXPORT]: CustomizeExportDialog,
  [MDT_COLUMN_RANGE]: ColumnRangeDialog,
  [MDT_ZOOM]: ZoomDialog,
  [MDT_SETTINGS]: SettingsDialog,
  [MDT_ADD_TO_WATCH]: AddToWatchDialog,
  [MDT_STOCKS_BY_SECTOR]: StocksBySectorDialog,
  [MDT_PASTE_TO]: PasteToModalDialog,

  _loadWL(){
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === '_development') {
      this.WL = import("js/components/watch-browser/ModalDialogs.js")
        .then(module => module.default )
        .catch(err => console.log(MSG_OFFLINE))
   /*eslint-enable no-undef */
    } else {
     this.WL = import(
          /* webpackChunkName: "watch-dialogs" */
          /* webpackMode: "lazy" */
          "../../components/watch-browser/ModalDialogs"
        )
       .then(module => module.default )
       .catch(err => console.log(MSG_OFFLINE))
     }
  },
  get [MDT_LOAD_ITEM]() {
    return this.WL.then(D => D.LoadItem);
  },
  get [MDT_EDIT_WATCH_GROUP]() {
    return this.WL.then(D => D.EditGroup);
  },
  get [MDT_EDIT_WATCH_LIST]() {
    return this.WL.then(D => D.EditList)
  },


  loadDialogs(id){
    switch (id) {
      case BT_WATCH_LIST: this._loadWL(); break;
      default: return;
    }
  }
}

const RouterModalDialog = {
  getDialog(id){
    return Promise.resolve(_router[id]);
  },
  loadDialogs(id){
    _router.loadDialogs(id)
  }
}

export default RouterModalDialog
