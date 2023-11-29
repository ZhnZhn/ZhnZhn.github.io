import LocalForage from 'localforage';

import DF_WATCH_LIST from '../../constants/WatchDefault';
import { MDT_INFO }  from '../../constants/ModalDialogType';
import {
  WATCH_SAVED,
  WATCH_PREV
} from '../../constants/MsgWatch';

import {
  WAT_ADD_ITEM,
  WAT_ADD_GROUP,
  WAT_RENAME_GROUP,
  WAT_DELETE_GROUP,
  WAT_CREATE_LIST,
  WAT_RENAME_LIST,
  WAT_DELETE_LIST
} from '../actions/WatchActions';

import {
  createStoreWithSelector,
  getStoreApi,
  fCrUse,
  fUseStoreState
} from '../storeApi';

import {
  showModalDialog,
  showAlertDialog
} from '../stores/compStore';

import { findGroup } from './LogicFn';
import {
  dragDropItem,
  dragDropList,
  dragDropGroup
} from './DragDropFn';
import {
  addGroup,
  renameGroup,
  deleteGroup
} from './GroupFn';
import {
  createList,
  renameList,
  deleteList
} from './ListFn';
import {
  addItem,
  removeItem
} from './ItemFn';

const STORAGE_KEY = 'WATCH_LIST_ERC'
, DIALOG_CAPTION ='Watch List:';

const _crStore = () => ({
  isWatchEdited: false,
  watchList: DF_WATCH_LIST,
  msEdit: {}
})
, _watchListStore = createStoreWithSelector(_crStore)
, _selectWatchList = state => state.watchList
, _selectMsEdit = state => state.msEdit
, _selectIsWatchEdited = state => state.isWatchEdited
, [_set, _get] = getStoreApi(_watchListStore);

export const getIsWatchEdited = () => _selectIsWatchEdited(_get());

export const getWatchList = () => _selectWatchList(_get())

export const useWatchList = fUseStoreState(_watchListStore, _selectWatchList)
export const useMsEdit = fCrUse(_watchListStore, _selectMsEdit)
export const useIsWatchEdited = fCrUse(_watchListStore, _selectIsWatchEdited)

export const getWatchGroups = () => (getWatchList() || {}).groups
export const getWatchListsByGroup = (groupCaption) => {
  const group = findGroup(getWatchList(), groupCaption);
  return group
    ? group.lists
    : [];
}

export const initWatchList = () => {
  LocalForage
   .getItem(STORAGE_KEY)
   .then(value => {
     _set({ watchList: value || DF_WATCH_LIST })
   })
   .catch(() => {
     _set({ watchList: DF_WATCH_LIST })
  })
}

export const saveWatchList = () => {
  const _isWatchEdited = getIsWatchEdited();
  if (_isWatchEdited) {
     LocalForage.setItem(STORAGE_KEY , getWatchList())
        .then(() => {
           _set({ isWatchEdited: false })
           showModalDialog(MDT_INFO, {
              caption: DIALOG_CAPTION,
              descr: WATCH_SAVED
           })
        })
        .catch((error) => {
           console.log(error);
        })
  } else {
     showModalDialog(MDT_INFO, {
        caption: DIALOG_CAPTION,
        descr: WATCH_PREV
     })
  }
}

const _onEditWatch = (
  result,
  forActionType
) => {
  if (result.isDone){
    _set({
      isWatchEdited: true,
      watchList: { ...getWatchList() },
      msEdit: { forActionType }
    })
  } else {
    _set({
      msEdit: {
        messages:[result.message],
        forActionType
      }
    })
  }
}

const _fEditWatch = (
  editEntity,
  EDIT_ENTITY
) => (option) => {
  _onEditWatch(
    editEntity(getWatchList(), option),
    EDIT_ENTITY
  )
};

export const crGroup = _fEditWatch(addGroup, WAT_ADD_GROUP)
export const renGroup = _fEditWatch(renameGroup, WAT_RENAME_GROUP)
export const delGroup = _fEditWatch(deleteGroup, WAT_DELETE_GROUP)
export const crList = _fEditWatch(createList, WAT_CREATE_LIST)
export const renList = _fEditWatch(renameList, WAT_RENAME_LIST)
export const delList = _fEditWatch(deleteList, WAT_DELETE_LIST)

const _addItem = _fEditWatch(addItem, WAT_ADD_ITEM);
export const addWatchItem = (item) => {
  _addItem(item)
}
export const deleteWatchItem = (option) => {
  removeItem(getWatchList(), option);
  _set({
    isWatchEdited: true,
    watchList: {...getWatchList()}
  })
}

const _onDragDrop = (
  result
) => {
  if (result.isDone){
    _set({
      isWatchEdited: true,
      watchList: {...getWatchList()}
    })
  } else {
    showAlertDialog(result)
  }
}
const _fDdEntity = (ddEntity) => (option) => {
  _onDragDrop(ddEntity(getWatchList(), option))
};
export const ddItem = _fDdEntity(dragDropItem)
export const ddList = _fDdEntity(dragDropList)
export const ddGroup = _fDdEntity(dragDropGroup)
