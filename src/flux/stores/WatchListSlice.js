
import LocalForage from 'localforage';
import ComponentActions from '../actions/ComponentActions';
import {ComponentActionTypes} from '../actions/ComponentActions';
import {WatchActionTypes} from '../actions/WatchActions';
import WatchDefault from '../../constants/WatchDefault';
import {ModalDialog}  from '../../constants/Type';
import ValidationMessages from '../../constants/ValidationMessages'

const key = 'watchList';

const _fnOpenInfoDialog = function(descr){
  ComponentActions.showModalDialog(ModalDialog.INFO, {
    caption : 'Watch List:',
    descr : descr
  });
}

const _fResultNotFound = function(itemType, name){
  return {isDone : false, message : ValidationMessages.NOT_FOUND_ITEM(itemType, name)}
}
const _fResultGroupExisted = function(caption){
  return {isDone : false, message : ValidationMessages.GROUP_EXISTED(caption)}
}
const _fResultListExisted = function(captionList, captionGroup){
  return {isDone : false, message : ValidationMessages.LIST_EXISTED(captionList, captionGroup)}
}
const _fResultItemExisted = function(caption, captionList){
  return {isDone : false, message : ValidationMessages.ITEM_EXISTED(caption, captionList)}
}

const _fnFilter = function(arr, caption){
  return arr.filter((obj, index) =>{
    return obj.caption !== caption
  });
}

const _fnFindIndex = function(arr, caption){
   return arr.findIndex((item, index) => {
      return item.caption === caption;
  })
}

const _fnGetArrayWithObj = function(arr, obj){
  return (arr) ? [...arr, obj] : [obj];
}
const _fnGetArrayWithRename = function(arr, index, caption){
  return [
    ...arr.slice(0, index),
    Object.assign({}, arr[index], {caption}),
    ...arr.slice(index+1)
  ]
}

const _fnCheckIsInArraySameCaption = function(arr, caption){
    const index = (arr) ? arr.findIndex((item, i) => {
        return item.caption === caption;
    }) : -1 ;
    if (index === -1) { return false;}
    else {return true;}
}

const _fnFindGroup = function(watchList, captionGroup){
  return watchList.groups.find((group, index) => {
      return group.caption === captionGroup;
  })
}

const _fnFindList = function(group, captionList){
  return group.lists.find((list, index) => {
      return list.caption === captionList;
  });
}

const _fnAddItem = function(watchList, item){
  const {caption, groupCaption, listCaption, config} = item
      , {zhConfig} = config
      , {dataColumn, id} = zhConfig
      , toGroup = _fnFindGroup(watchList, groupCaption)
      , toList = _fnFindList(toGroup, listCaption)
      , items = toList.items;
  if ( _fnCheckIsInArraySameCaption(items, caption) ){
    return _fResultItemExisted(caption, listCaption);
  }
  if (items){
    toList.items.push({ caption, dataColumn, id });
  } else {
    toList.items = [{ caption, dataColumn, id }];
  }
  return {isDone : true}
}
const _fnRemoveItem = function(watchList, {groupCaption, listCaption, caption}){
  const groupFrom = _fnFindGroup(watchList, groupCaption)
      , listFrom = _fnFindList(groupFrom, listCaption);
  listFrom.items = _fnFilter(listFrom.items, caption);
}

const _fnAddGroup = function(watchList, {caption}){
  const groups = watchList.groups;
  if (_fnCheckIsInArraySameCaption(groups, caption)){
    return _fResultGroupExisted(caption);
  }
  watchList.groups = _fnGetArrayWithObj(groups, WatchDefault.fDefaultGroup({caption}));
  return {isDone : true};
}
const _fnRenameGroup = function(watchList, {captionFrom, captionTo}){
  const groups = watchList.groups;
  const groupIndex = _fnFindIndex(groups, captionFrom);
  if (groupIndex === -1){
    return _fResultNotFound('group', captionFrom);
  }
  if ( _fnCheckIsInArraySameCaption(groups, captionTo) ){
    return _fResultGroupExisted(captionTo);
  }
  watchList.groups = _fnGetArrayWithRename(groups, groupIndex, captionTo)
  return {isDone : true}
}
const _fnDeleteGroup = function(watchList, {caption}){
  watchList.groups = _fnFilter(watchList.groups, caption);
  return {isDone : true}
}

const _fnCreateList = function(watchList, {captionGroup, captionList}){
  const groupTo = _fnFindGroup(watchList, captionGroup)
  if (!groupTo){
    return _fResultNotFound('group', captionGroup);
  }
  const lists = groupTo.lists;
  if (_fnCheckIsInArraySameCaption(lists, captionList)){
    return _fResultListExisted(captionList, captionGroup);
  }
  groupTo.lists = _fnGetArrayWithObj(lists, {caption: captionList});
  return {isDone : true};
}

const _fnRenameList = function(watchList, {captionGroup, captionListFrom, captionListTo}){
  const groupIn = _fnFindGroup(watchList, captionGroup);
  if (!groupIn){
    return _fResultNotFound('group', captionGroup);
  }
  const lists = groupIn.lists;
  const listIndex = _fnFindIndex(lists, captionListFrom);
  if (listIndex === -1){
    return _fResultNotFound('list', captionListFrom);
  }
  if ( _fnCheckIsInArraySameCaption(lists, captionListTo) ){
    return _fResultListExisted(captionListTo, captionGroup);
  }
  groupIn.lists = _fnGetArrayWithRename(lists, listIndex, captionListTo);
  return {isDone : true}
}

const _fnDeleteList = function(watchList, {captionGroup, captionList}){
  const groupFrom = _fnFindGroup(watchList, captionGroup);
  if (!groupFrom){
    return _fResultNotFound('group', captionGroup);
  }
  groupFrom.lists = _fnFilter(groupFrom.lists, captionList);
  return {isDone : true}
}



const WatchListSlice = {
  watchList : WatchDefault,
  isWatchEdited : false,
  //watchList : null,
  initWatchList(){
    LocalForage.getItem(key).then((value) => {
      this.watchList = (value) ? value : WatchDefault;
      this.trigger(ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
    })
    .catch(() => {
      this.watchList = WatchDefault;
      this.trigger(ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
    })
  },
  getWatchList(){
    return this.watchList;
  },
  getWatchGroups(){
    return this.watchList.groups;
  },
  getWatchListsByGroup(groupCaption){
    const group = _fnFindGroup(this.watchList, groupCaption);
    if (!group) { return []; }
    return group.lists;
  },

  onAddItem(item){
    this._onEditWatch(_fnAddItem(this.watchList, item), WatchActionTypes.ADD_ITEM);
  },
  onRemoveItem(option){
    _fnRemoveItem(this.watchList, option);
    this.isWatchEdited = true;
    this.trigger(ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
  },

  onSaveWatch(){
    if (this.isWatchEdited){
       LocalForage.setItem(key , this.watchList).then(()=>{
         this.isWatchEdited = false;
         _fnOpenInfoDialog(ValidationMessages.WATCH_SAVED)
         console.log(ValidationMessages.WATCH_SAVED);
       })
    } else {
       _fnOpenInfoDialog(ValidationMessages.WATCH_PREV);
    }
  },

  _onEditWatch(result, forActionType){
    if (result.isDone){
      this.isWatchEdited = true;
      this.trigger(ComponentActionTypes.UPDATE_WATCH_BROWSER, this.watchList);
      this.trigger(WatchActionTypes.EDIT_WATCH_COMPLETED, {forActionType});
    } else {
      this.trigger(WatchActionTypes.EDIT_WATCH_FAILED, {
          messages:[result.message],
          forActionType
      });
    }
  },
  onAddGroup(option){
    this._onEditWatch(_fnAddGroup(this.watchList, option), WatchActionTypes.ADD_GROUP);
  },
  onRenameGroup(option){
    this._onEditWatch(_fnRenameGroup(this.watchList, option), WatchActionTypes.RENAME_GROUP);
  },
  onDeleteGroup(option){
    this._onEditWatch(_fnDeleteGroup(this.watchList, option), WatchActionTypes.DELETE_GROUP);
  },

  onCreateList(option){
    this._onEditWatch(_fnCreateList(this.watchList, option), WatchActionTypes.CREATE_LIST);
  },
  onRenameList(option){
    this._onEditWatch(_fnRenameList(this.watchList, option), WatchActionTypes.RENAME_LIST);
  },
  onDeleteList(option){
    this._onEditWatch(_fnDeleteList(this.watchList, option), WatchActionTypes.DELETE_LIST);
  }

}

export default WatchListSlice
