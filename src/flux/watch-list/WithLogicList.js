
import LogicFn from './LogicFn';

const WithLogicList = {

  createList(watchList, {captionGroup, captionList}){
    const groupTo = LogicFn.findGroup(watchList, captionGroup)

    if (!groupTo){
      return LogicFn.fResultNotFound('group', captionGroup);
    }
    const lists = groupTo.lists;
    if (LogicFn.checkIsInArraySameCaption(lists, captionList)){
      return LogicFn.fResultListExisted(captionList, captionGroup);
    }

    groupTo.lists = LogicFn.getArrayWithObj(lists, {caption: captionList});
    return {isDone : true};
  },

  renameList(watchList, {captionGroup, captionListFrom, captionListTo}){
    const groupIn = LogicFn.findGroup(watchList, captionGroup);

    if (!groupIn){
      return LogicFn.fResultNotFound('group', captionGroup);
    }
    const lists = groupIn.lists;
    const listIndex = LogicFn.findIndex(lists, captionListFrom);
    if (listIndex === -1){
      return LogicFn.fResultNotFound('list', captionListFrom);
    }
    if ( LogicFn.checkIsInArraySameCaption(lists, captionListTo) ){
      return LogicFn.fResultListExisted(captionListTo, captionGroup);
    }

    groupIn.lists = LogicFn.getArrayWithRename(lists, listIndex, captionListTo);
    return {isDone : true}
  },

  deleteList(watchList, {captionGroup, captionList}){
    const groupFrom = LogicFn.findGroup(watchList, captionGroup);

    if (!groupFrom){
      return LogicFn.fResultNotFound('group', captionGroup);
    }

    groupFrom.lists = LogicFn.filter(groupFrom.lists, captionList);
    return {isDone : true}
  }

};

export default WithLogicList
