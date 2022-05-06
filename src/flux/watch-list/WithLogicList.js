import {
  crMsgNotFound,
  crMsgListExisted,

  findGroup,
  isInArraySameCaption,
  getArrayWithObj,
  findIndex,
  getArrayWithRename,
  filter
} from './LogicFn';

const WithLogicList = {

  createList(watchList, {captionGroup, captionList}){
    const groupTo = findGroup(watchList, captionGroup)

    if (!groupTo){
      return crMsgNotFound('group', captionGroup);
    }
    const lists = groupTo.lists;
    if (isInArraySameCaption(lists, captionList)){
      return crMsgListExisted(captionList, captionGroup);
    }

    groupTo.lists = getArrayWithObj(lists, {caption: captionList});
    return { isDone: true };
  },

  renameList(watchList, {captionGroup, captionListFrom, captionListTo}){
    const groupIn = findGroup(watchList, captionGroup);

    if (!groupIn){
      return crMsgNotFound('group', captionGroup);
    }
    const lists = groupIn.lists;
    const listIndex = findIndex(lists, captionListFrom);
    if (listIndex === -1){
      return crMsgNotFound('list', captionListFrom);
    }
    if ( isInArraySameCaption(lists, captionListTo) ){
      return crMsgListExisted(captionListTo, captionGroup);
    }

    groupIn.lists = getArrayWithRename(lists, listIndex, captionListTo);
    return { isDone: true };
  },

  deleteList(watchList, {captionGroup, captionList}){
    const groupFrom = findGroup(watchList, captionGroup);

    if (!groupFrom){
      return crMsgNotFound('group', captionGroup);
    }

    groupFrom.lists = filter(groupFrom.lists, captionList);
    return { isDone: true };
  }

};

export default WithLogicList
