import Reflux from 'reflux-core';

export const WatchActionTypes = {
  ADD_ITEM : 'addItem',
  REMOVE_ITEM : 'removeItem',
  SAVE_WATCH : 'saveWatch',

  DRAG_DROP_GROUP : 'dragDropGroup',
  DRAG_DROP_LIST : 'dragDropList',
  DRAG_DROP_ITEM : 'dragDropItem',

  ADD_GROUP : 'addGroup',
  RENAME_GROUP : 'renameGroup',
  DELETE_GROUP : 'deleteGroup',
  CREATE_LIST : 'createList',
  RENAME_LIST : 'renameList',
  DELETE_LIST : 'deleteList',

  EDIT_WATCH_COMPLETED : 'editWatchCompleted',
  EDIT_WATCH_FAILED : 'editWatchFailed'
};
const A = WatchActionTypes;

const WatchActions = Reflux.createActions({
  [A.ADD_ITEM] : {},
  [A.REMOVE_ITEM] : {},
  [A.SAVE_WATCH] : {},

  [A.DRAG_DROP_GROUP] : {},
  [A.DRAG_DROP_LIST] : {},
  [A.DRAG_DROP_ITEM] : {},

  [A.ADD_GROUP] : {},
  [A.RENAME_GROUP] : {},
  [A.DELETE_GROUP] : {},
  [A.CREATE_LIST] : {},
  [A.RENAME_LIST] : {},
  [A.DELETE_LIST] : {},

  [A.EDIT_WATCH_COMPLETED] : {},
  [A.EDIT_WATCH_FAILED] : {}
})

export default WatchActions
