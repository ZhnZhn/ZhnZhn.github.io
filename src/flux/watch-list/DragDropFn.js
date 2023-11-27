import {
  crAlertItemExisted,
  crAlertListExisted,

  findGroup,
  findList,
  findIndex,

  isInArraySameCaption,
  filter,
  insertItemInArray
} from './LogicFn';


export const dragDropItem = (
  watchList,
  {dragId, dropId}
) => {
  const dragArr = dragId.split(';')
  , dragGroup = findGroup(watchList, dragArr[0])
  , dragList = findList(dragGroup, dragArr[1])
  , dragIndex = findIndex(dragList.items, dragArr[2])
  , dragItem = dragList.items[dragIndex];

  const dropArr = dropId.split(';')
  , dropGroup = findGroup(watchList, dropArr[0])
  , dropList = findList(dropGroup, dropArr[1])
  , dropIndex = (dropArr[2])
     ? findIndex(dropList.items, dropArr[2])
     : 0;

  //dragArr[3] => dragArr[2]
  if ( dragList.caption !== dropList.caption
      && isInArraySameCaption(dropList.items, dragArr[2]) )
  {
      return crAlertItemExisted(dropArr[1], dragArr[2]);
  }

  dragList.items = filter(dragList.items, dragArr[2])
  dropList.items = insertItemInArray(dragItem, dropIndex, dropList.items);

  return { isDone: true };
}

export const dragDropList = (
  watchList,
  {dragId, dropId}
) => {
  const [dragGroupCaption, dragListCaption] = dragId.split(';')
  , dragGroup = findGroup(watchList, dragGroupCaption)
  , dragList = findList(dragGroup, dragListCaption);

  const [dropGroupCaption, dropListCaption] = dropId.split(';')
  , dropGroup = findGroup(watchList, dropGroupCaption)
  , dropIndex = (dropListCaption)
      ? findIndex(dropGroup.lists, dropListCaption)
      : 0;

  if ( dragGroup.caption !== dropGroup.caption &&
      isInArraySameCaption(dropGroup.lists, dragListCaption) )
  {
    return crAlertListExisted(dropGroupCaption, dragListCaption)
  }

  dragGroup.lists = filter(dragGroup.lists, dragListCaption);
  dropGroup.lists = insertItemInArray(dragList, dropIndex, dropGroup.lists);

  return { isDone: true };
}

export const dragDropGroup = (
  watchList,
  {dragId, dropId}
) => {
  const [dragGroupCaption] = dragId.split(';')
  , dragGroup = findGroup(watchList, dragGroupCaption)
  , [dropGroupCaption] = dropId.split(';')
  , dropIndex = (dropGroupCaption)
      ? findIndex(watchList.groups, dropGroupCaption)
      : 0;

  watchList.groups = filter(watchList.groups, dragGroupCaption);
  watchList.groups = insertItemInArray(dragGroup, dropIndex, watchList.groups)

  return { isDone: true };
}
