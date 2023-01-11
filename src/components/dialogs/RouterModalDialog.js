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
import ColumnRangeDialog from './ColumnRangeDialog'
import ZoomDialog from './ZoomDialog'
import SettingsDialog from '../header/SettingsDialog';
import AddToWatchDialog from '../watch-browser/AddToWatchDialog';

import PasteToModalDialog from '../dialogs-modal/PasteToModalDialog';

const MSG_OFFLINE = 'It seems you are offline';
const _resolve = Promise.resolve.bind(Promise);

const _router = {
  [MDT_ASK]: AskDialog,
  [MDT_RELOAD]: ReloadDialog,
  [MDT_INFO]: InfoDialog,
  [MDT_ALERT]: AlertDialog,
  [MDT_DESCRIPTION]: DescriptionDialog,
  [MDT_COLUMN_RANGE]: ColumnRangeDialog,
  [MDT_ZOOM]: ZoomDialog,
  [MDT_SETTINGS]: SettingsDialog,
  [MDT_ADD_TO_WATCH]: AddToWatchDialog,
  [MDT_PASTE_TO]: PasteToModalDialog,

  _loadGMD(){
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return import("js/components/dialogs-modal/GeneralModalDialogs.js")
        .then(module => this.GMD = _resolve(module.default))
        .catch(err => console.log(MSG_OFFLINE))
   /*eslint-enable no-undef */
    } else {
     return import(
          /* webpackChunkName: "general-modal-dialogs" */
          /* webpackMode: "lazy" */
          "../../components/dialogs-modal/GeneralModalDialogs"
        )
       .then(module => this.GMD = _resolve(module.default))
       .catch(err => console.log(MSG_OFFLINE))
     }
  },
  getGMD(){
    return this.GMD || this._loadGMD();
  },
  get [MDT_CUSTOMIZE_EXPORT]() {
    return this.getGMD().then(D => D.CeDialog);
  },
  get [MDT_STOCKS_BY_SECTOR]() {
    return this.getGMD().then(D => D.SbsDialog);
  },

  _loadWL(){
    /*eslint-disable no-undef */
    if (process.env.NODE_ENV === '_development') {
      return import("js/components/watch-browser/ModalDialogs.js")
        .then(module => this.WL = _resolve(module.default))
        .catch(err => console.log(MSG_OFFLINE))
   /*eslint-enable no-undef */
    } else {
     return import(
          /* webpackChunkName: "watch-dialogs" */
          /* webpackMode: "lazy" */
          "../../components/watch-browser/ModalDialogs"
        )
       .then(module => this.WL = _resolve(module.default))
       .catch(err => console.log(MSG_OFFLINE))
     }
  },
  getWL() {
    return this.WL || this._loadWL();
  },
  get [MDT_LOAD_ITEM]() {
    return this.getWL().then(D => D.LoadItem);
  },
  get [MDT_EDIT_WATCH_GROUP]() {
    return this.getWL().then(D => D.EditGroup);
  },
  get [MDT_EDIT_WATCH_LIST]() {
    return this.getWL().then(D => D.EditList)
  },


  loadDialogs(id){
    switch (id) {
      case BT_WATCH_LIST: this._loadWL(); break;
      default: return;
    }
  }
}


export const getModalDialog = (
  id
) => _resolve(_router[id])

export const loadModalDialogs = (id) => {
  _router.loadDialogs(id)
}
