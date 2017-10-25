
import {
  ModalDialog as M,
  BrowserType as BT
} from '../../constants/Type';

import AskDialog from './AskDialog';
import ReloadDialog from './ReloadDialog';
import InfoDialog from './InfoDialog';
import AlertDialog from './AlertDialog';
import DescriptionDialog from './DescriptionDialog';
import CustomizeExportDialog from './CustomizeExportDialog';
import UsStocksBySectorDialog from './UsStocksBySectorDialog';
import StocksBySectorDialog from './StocksBySectorDialog';
import SettingsDialog from '../header/SettingsDialog';
import AddToWatchDialog from '../watch-browser/AddToWatchDialog';

import PasteToModalDialog from '../items/PasteToModalDialog'

const MSG_OFFLINE = 'It seems you are offline';

const _router = {
  [M.ASK] : AskDialog,
  [M.RELOAD] : ReloadDialog,
  [M.INFO] : InfoDialog,
  [M.ALERT] : AlertDialog,
  [M.DESCRIPTION] : DescriptionDialog,
  [M.CUSTOMIZE_EXPORT] : CustomizeExportDialog,
  [M.SETTINGS] : SettingsDialog,
  [M.ADD_TO_WATCH] : AddToWatchDialog,
  [M.US_STOCK_BY_SECTOR] : UsStocksBySectorDialog,
  [M.STOCKS_BY_SECTOR] : StocksBySectorDialog,
  [M.PASTE_TO]: PasteToModalDialog,

  _loadWL(){
    /*eslint-disable no-undef */
    if ( process.env.NODE_ENV === 'development') {
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
  get [M.LOAD_ITEM]() {
    return this.WL.then(D => D.LoadItem);
  },
  get [M.EDIT_WATCH_GROUP]() {
    return this.WL.then(D => D.EditGroup);
  },
  get [M.EDIT_WATCH_LIST]() {
    return this.WL.then(D => D.EditList)
  },


  loadDialogs(id){
    switch (id) {
      case BT.WATCH_LIST: this._loadWL(); break;
      default: return undefined
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
