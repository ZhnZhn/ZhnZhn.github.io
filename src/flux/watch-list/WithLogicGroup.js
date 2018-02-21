import LogicFn from './LogicFn'

const {
  crMsgGroupExisted,
  crMsgNotFound,

  isInArraySameCaption,
  getArrayWithObj,
  findIndex,
  getArrayWithRename,
  filter
} = LogicFn;

const WithLogicGroup = {

  addGroup(watchList, { caption }){
    const groups = watchList.groups;

    if ( isInArraySameCaption(groups, caption)){
      return crMsgGroupExisted(caption);
    }

    const _captionObj = (caption)
             ? { caption }
             : { caption: "Default" };

    watchList.groups = getArrayWithObj(groups, _captionObj);
    return { isDone: true};
  },

  renameGroup(watchList, {captionFrom, captionTo}){
    const groups = watchList.groups
        , groupIndex = findIndex(groups, captionFrom);

    if (groupIndex === -1){
      return crMsgNotFound('group', captionFrom);
    }
    if ( isInArraySameCaption(groups, captionTo) ){
      return crMsgGroupExisted(captionTo);
    }

    watchList.groups = getArrayWithRename(groups, groupIndex, captionTo)
    return { isDone: true };
  },

  deleteGroup(watchList, {caption}){
    watchList.groups = filter(watchList.groups, caption);
    return { isDone: true };
  }

};

export default WithLogicGroup
