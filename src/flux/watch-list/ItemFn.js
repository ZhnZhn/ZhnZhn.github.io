import {
  crMsgItemExisted,
  findGroup,
  findList,
  isInArraySameCaption,
  filter
} from './LogicFn';

export const addItem = (
  watchList,
  item
) => {
  const {
    caption,
    groupCaption,
    listCaption,
    config
  } = item
  , { zhConfig } = config
  , {
     id, title, subtitle,
     itemConf={}
  } = zhConfig
  , toGroup = findGroup(watchList, groupCaption)
  , toList = findList(toGroup, listCaption);

  if ( isInArraySameCaption(toList.items, caption) ){
    return crMsgItemExisted(caption, listCaption);
  }
  const _item = {
     id,
     title,
     subtitle,
     caption,
     itemConf
   }
  if (toList.items){
    toList.items.push(_item);
  } else {
    toList.items = [_item];
  }
  return { isDone: true };
}

export const removeItem = (
  watchList,
  {groupCaption, listCaption, caption}
) => {
  const groupFrom = findGroup(watchList, groupCaption)
  , listFrom = findList(groupFrom, listCaption);

  listFrom.items = filter(listFrom.items, caption);
}
