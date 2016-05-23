import Reflux from 'reflux';

export const WatchActionTypes = {
  ADD_ITEM : 'addItem',
  REMOVE_ITEM : 'removeItem',
  SAVE_WATCH : 'saveWatch'
}

const WatchActions = Reflux.createActions({
  [WatchActionTypes.ADD_ITEM] : {},
  [WatchActionTypes.REMOVE_ITEM] : {},
  [WatchActionTypes.SAVE_WATCH] : {}
})

export default WatchActions
