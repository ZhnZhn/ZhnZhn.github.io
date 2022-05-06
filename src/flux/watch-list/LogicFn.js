import {
  notFoundItem,
  groupExisted,
  listExisted,
  itemExisted,
  ALERT_DND_LIST,
  ALERT_DND_ITEM
} from '../../constants/MsgWatch';

import {
  arrFactoryFindIndexByProp,
  arrFactoryIsSameByProp
} from '../../utils/arrFn';

import {
  imArrPush,
  imArrFactoryFilterByProp,
  imArrFactoryEditByProp,
  imArrInsertItem
} from '../../utils/imArrFn';

import factoryFindInPropArrayByProp from '../../utils/factoryFindInPropArrayByProp';

const CAPTION = 'caption'
, GROUPS = 'groups'
, LISTS = 'lists' ;

const LogicFn = {

  crMsgNotFound(itemType, name){
    return {
      isDone: false,
      message: notFoundItem(itemType, name)
    };
  },
  crMsgGroupExisted(caption){
    return {
      isDone: false,
      message: groupExisted(caption)
    };
  },
  crMsgListExisted(captionList, captionGroup){
    return {
      isDone: false,
      message: listExisted(captionList, captionGroup)
    };
  },
  crMsgItemExisted(caption, captionList){
    return {
      isDone: false,
      message: itemExisted(caption, captionList)
    };
  },

  /* for DragDrop */
  crAlertItemExisted(dropId, dragId){
    return {
      isDone : false,
      alertItemId : `${dropId}:${dragId}`,
      ...ALERT_DND_ITEM
   };
 },
 crAlertListExisted(dropGroupCaption, dragListCaption){
   return {
      isDone : false,
      alertItemId : `${dropGroupCaption}:${dragListCaption}`,
      ...ALERT_DND_LIST
   }
 },
 /* for DragDrop */

  filter : imArrFactoryFilterByProp(CAPTION),
  getArrayWithObj : imArrPush,

  getArrayWithRename: imArrFactoryEditByProp(CAPTION),

  /* for DragDrop */
  insertItemInArray : imArrInsertItem,
  /* for DragDrop */

  findGroup : factoryFindInPropArrayByProp(GROUPS, CAPTION),
  findList : factoryFindInPropArrayByProp(LISTS, CAPTION),

  findIndex : arrFactoryFindIndexByProp('caption'),
  isInArraySameCaption : arrFactoryIsSameByProp(CAPTION)

};

export default LogicFn
