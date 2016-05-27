import Reflux from 'reflux';

export const WatchActionTypes = {
  ADD_ITEM : 'addItem',
  REMOVE_ITEM : 'removeItem',
  SAVE_WATCH : 'saveWatch',

  ADD_GROUP : 'addGroup',
  RENAME_GROUP : 'renameGroup',
  DELETE_GROUP : 'deleteGroup',
  CREATE_LIST : 'createList',
  RENAME_LIST : 'renameList',
  DELETE_LIST : 'deleteList',
    EDIT_WATCH_COMPLETED : 'editWatchCompleted',
    EDIT_WATCH_FAILED : 'editWatchFailed'
}

const WatchActions = Reflux.createActions({
  [WatchActionTypes.ADD_ITEM] : {},
  [WatchActionTypes.REMOVE_ITEM] : {},
  [WatchActionTypes.SAVE_WATCH] : {},

  [WatchActionTypes.ADD_GROUP] : {},
  [WatchActionTypes.RENAME_GROUP] : {},
  [WatchActionTypes.DELETE_GROUP] : {},
  [WatchActionTypes.CREATE_LIST] : {},
  [WatchActionTypes.RENAME_LIST] : {},
  [WatchActionTypes.DELETE_LIST] : {},
      [WatchActionTypes.EDIT_WATCH_COMPLETED] : {},
      [WatchActionTypes.EDIT_WATCH_FAILED] : {}

})

export default WatchActions
