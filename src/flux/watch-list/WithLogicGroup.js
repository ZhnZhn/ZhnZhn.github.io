import LogicFn from './LogicFn'

const WithLogicGroup = {

  addGroup(watchList, { caption }){
    const groups = watchList.groups;

    if ( LogicFn.checkIsInArraySameCaption(groups, caption)){
      return LogicFn.fResultGroupExisted(caption);
    }

    const _captionObj = (caption)
             ? { caption }
             : { caption: "Default" };

    watchList.groups = LogicFn.getArrayWithObj(groups, _captionObj);
    return {isDone : true};
  },

  renameGroup(watchList, {captionFrom, captionTo}){
    const groups = watchList.groups
        , groupIndex = LogicFn.findIndex(groups, captionFrom);

    if (groupIndex === -1){
      return LogicFn.fResultNotFound('group', captionFrom);
    }
    if ( LogicFn.checkIsInArraySameCaption(groups, captionTo) ){
      return LogicFn.fResultGroupExisted(captionTo);
    }

    watchList.groups = LogicFn.getArrayWithRename(groups, groupIndex, captionTo)
    return {isDone : true}
  },

  deleteGroup(watchList, {caption}){
    watchList.groups = LogicFn.filter(watchList.groups, caption);
    return {isDone : true}
  }

};

export default WithLogicGroup
