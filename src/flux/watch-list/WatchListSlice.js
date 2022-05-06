import LocalForage from 'localforage';

import { BAT_UPDATE_WATCH_BROWSER } from '../actions/BrowserActions';
import { WatchActionTypes as WAT } from '../actions/WatchActions';
import DF_WATCH_LIST from '../../constants/WatchDefault';
import { ModalDialog }  from '../../constants/Type';
import {
  WATCH_SAVED,
  WATCH_PREV
} from '../../constants/MsgWatch';

import { findGroup } from './LogicFn';
import {
  dragDropItem,
  dragDropList,
  dragDropGroup
} from './WithLogicDnD';
import {
  addGroup,
  renameGroup,
  deleteGroup
} from './WithLogicGroup';
import {
  createList,
  renameList,
  deleteList
} from './WithLogicList';
import {
  addItem,
  removeItem
} from './WithLogicItem';

const STORAGE_KEY = 'WATCH_LIST_ERC'
, DIALOG_CAPTION ='Watch List:';

const WatchListSlice = {

  watchList: DF_WATCH_LIST,
  isWatchEdited: false,

  initWatchList(){
    LocalForage
     .getItem(STORAGE_KEY)
     .then(value => {
       this.watchList = value || DF_WATCH_LIST;
       this.trigger(BAT_UPDATE_WATCH_BROWSER, this.watchList);
     })
     .catch(() => {
       this.watchList = DF_WATCH_LIST;
       this.trigger(BAT_UPDATE_WATCH_BROWSER, this.watchList);
    })
  },
  getWatchList(){
    return this.watchList;
  },
  getWatchGroups(){
    return this.watchList.groups;
  },
  getWatchListsByGroup(groupCaption){
    const group = findGroup(this.watchList, groupCaption);
    if (!group) { return []; }
    return group.lists;
  },

  onAddItem(item){
    this._onEditWatch(
      addItem(this.watchList, item),
      WAT.ADD_ITEM
    );
  },
  onRemoveItem(option){
    removeItem(this.watchList, option);
    this._triggerUpdateWL()
  },

  _triggerUpdateWL(){
    this.isWatchEdited = true;
    this.trigger(BAT_UPDATE_WATCH_BROWSER, this.watchList);
  },


  _onDragDrop(result){
    if (result.isDone){
       this._triggerUpdateWL()
    } else {
      this.showAlertDialog(result);
    }
  },


  onDragDropItem(option){
    this._onDragDrop(dragDropItem(this.watchList, option) );
  },
  onDragDropList(option){
    this._onDragDrop(dragDropList(this.watchList, option) );
  },
  onDragDropGroup(option){
    this._onDragDrop(dragDropGroup(this.watchList, option));
  },


  onSaveWatch(){
    if (this.isWatchEdited){
       LocalForage.setItem(STORAGE_KEY , this.watchList)
          .then(()=>{
             this.isWatchEdited = false;
             this.onShowModalDialog(ModalDialog.INFO, {
                caption: DIALOG_CAPTION,
                descr: WATCH_SAVED
             })
          })
          .catch((error) => {
             console.log(error);
          })
    } else {
       this.onShowModalDialog(ModalDialog.INFO, {
          caption: DIALOG_CAPTION,
          descr: WATCH_PREV
       })
    }
  },

  _onEditWatch(result, forActionType){
    if (result.isDone){
      this._triggerUpdateWL()
      this.trigger(WAT.EDIT_WATCH_COMPLETED, { forActionType });
    } else {
      this.trigger(WAT.EDIT_WATCH_FAILED, {
          messages:[result.message],
          forActionType
      });
    }
  },
  onAddGroup(option){
    this._onEditWatch(
      addGroup(this.watchList, option),
      WAT.ADD_GROUP
    );
  },
  onRenameGroup(option){
    this._onEditWatch(
      renameGroup(this.watchList, option),
      WAT.RENAME_GROUP
    );
  },
  onDeleteGroup(option){
    this._onEditWatch(
      deleteGroup(this.watchList, option),
      WAT.DELETE_GROUP
    );
  },

  onCreateList(option){
    this._onEditWatch(
      createList(this.watchList, option),
      WAT.CREATE_LIST
    );
  },
  onRenameList(option){
    this._onEditWatch(
      renameList(this.watchList, option),
      WAT.RENAME_LIST
    );
  },
  onDeleteList(option){
    this._onEditWatch(
      deleteList(this.watchList, option),
      WAT.DELETE_LIST
    );
  }

}

export default WatchListSlice
