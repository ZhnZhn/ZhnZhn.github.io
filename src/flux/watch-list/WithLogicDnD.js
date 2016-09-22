import LogicFn from './LogicFn';

const WithLogicDnD = {

  dragDropItem(watchList, {dragId, dropId}){
    const dragArr = dragId.split(';')
        , dragGroup = LogicFn.findGroup(watchList, dragArr[0])
        , dragList = LogicFn.findList(dragGroup, dragArr[1])
        , dragIndex = LogicFn.findIndex(dragList.items, dragArr[2])
        , dragItem = dragList.items[dragIndex];

    const dropArr = dropId.split(';')
        , dropGroup = LogicFn.findGroup(watchList, dropArr[0])
        , dropList = LogicFn.findList(dropGroup, dropArr[1])
        , dropIndex = (dropArr[2])
             ? LogicFn.findIndex(dropList.items, dropArr[2])
             : 0;

    if ( dragList.caption !== dropList.caption &&
         LogicFn.checkIsInArraySameCaption(dropList.items, dragArr[3]) )
    {
        return LogicFn.fDragDropItemExisted(dropArr[1], dragArr[2]);
    }

    dragList.items = LogicFn.filter(dragList.items, dragArr[2])
    dropList.items = LogicFn.insertItemInArray(dragItem, dropIndex, dropList.items);

    return { isDone : true }
  },

  dragDropList(watchList, {dragId, dropId}){
    const [ dragGroupCaption, dragListCaption ] = dragId.split(';')
        , dragGroup = LogicFn.findGroup(watchList, dragGroupCaption)
        , dragList = LogicFn.findList(dragGroup, dragListCaption);

    const [ dropGroupCaption, dropListCaption ] = dropId.split(';')
        , dropGroup = LogicFn.findGroup(watchList, dropGroupCaption)
        , dropIndex = (dropListCaption)
              ? LogicFn.findIndex(dropGroup.lists, dropListCaption)
              : 0;

    if ( dragGroup.caption !== dropGroup.caption &&
         LogicFn.checkIsInArraySameCaption(dropGroup.lists, dragListCaption) )
    {
      return LogicFn.fDragDropListExisted(dropGroupCaption, dragListCaption)
    }

    dragGroup.lists = LogicFn.filter(dragGroup.lists, dragListCaption);
    dropGroup.lists = LogicFn.insertItemInArray(dragList, dropIndex, dropGroup.lists);

    return { isDone : true };
  },

  dragDropGroup(watchList, {dragId, dropId}){
     const [ dragGroupCaption ] = dragId.split(';')
         , dragGroup = LogicFn.findGroup(watchList, dragGroupCaption)

         , [ dropGroupCaption ] = dropId.split(';')
         , dropIndex = (dropGroupCaption)
               ? LogicFn.findIndex(watchList.groups, dropGroupCaption)
               : 0;

      watchList.groups = LogicFn.filter(watchList.groups, dragGroupCaption);
      watchList.groups = LogicFn.insertItemInArray(dragGroup, dropIndex, watchList.groups)

      return { isDone : true };
  }

};

export default WithLogicDnD
