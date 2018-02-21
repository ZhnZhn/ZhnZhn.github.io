import MsgWatch from '../../constants/MsgWatch';

import ut from '../../utils/fnUtil';

const  {
  notFoundItem,
  groupExisted,
  listExisted,
  itemExisted,
  ALERT_DND_LIST,
  ALERT_DND_ITEM
} = MsgWatch;

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

  filter : ut.imArr.filterByPropFn(CAPTION),
  getArrayWithObj : ut.imArr.push,

  getArrayWithRename: ut.imArr.editByPropFn(CAPTION),

  /* for DragDrop */
  insertItemInArray : ut.imArr.insertItem,
  /* for DragDrop */

  findGroup : ut.obj.findInPropArrayByProp(GROUPS, CAPTION),
  findList : ut.obj.findInPropArrayByProp(LISTS, CAPTION),

  findIndex : ut.arr.findIndexByProp('caption'),
  isInArraySameCaption : ut.arr.isSameByProp(CAPTION)

};

export default LogicFn
