import Msg from '../../constants/Msg';

import ImArrayUtil from '../../utils/ImArrayUtil';
import ObjUtil from '../../utils/ObjUtil';
import ArrayUtil from '../../utils/ArrayUtil';

const CAPTION = 'caption'
    , GROUPS = 'groups'
    , LISTS = 'lists' ;

const LogicFn = {

  fResultNotFound(itemType, name){
    return {isDone : false, message : Msg.NOT_FOUND_ITEM(itemType, name)}
  },
  fResultGroupExisted(caption){
    return {isDone : false, message : Msg.GROUP_EXISTED(caption)}
  },
  fResultListExisted(captionList, captionGroup){
    return {isDone : false, message : Msg.LIST_EXISTED(captionList, captionGroup)}
  },
  fResultItemExisted(caption, captionList){
    return {isDone : false, message : Msg.ITEM_EXISTED(caption, captionList)}
  },

  /* for DragDrop */
  fDragDropItemExisted(dropId, dragId){
    return {
      isDone : false,
      alertItemId : `${dropId}:${dragId}`,
      alertCaption : Msg.Alert.DRAG_DROP_ITEM.caption,
      alertDescr : Msg.Alert.DRAG_DROP_ITEM.descr
   };
 },
 fDragDropListExisted(dropGroupCaption, dragListCaption){
   return {
      isDone : false,
      alertItemId : `${dropGroupCaption}:${dragListCaption}`,
      alertCaption : Msg.Alert.DRAG_DROP_LIST.caption,
      alertDescr : Msg.Alert.DRAG_DROP_LIST.descr
   }
 },
 /* for DragDrop */

  filter : ImArrayUtil.filterByPropFn(CAPTION),
  getArrayWithObj : ImArrayUtil.push,

  getArrayWithRename: ImArrayUtil.editByPropFn(CAPTION),

  /* for DragDrop */
  insertItemInArray : ImArrayUtil.insertItem,
  /* for DragDrop */

  findGroup : ObjUtil.findInPropArrayByProp(GROUPS, CAPTION),
  findList : ObjUtil.findInPropArrayByProp(LISTS, CAPTION),

  findIndex : ArrayUtil.findIndexByProp('caption'),
  checkIsInArraySameCaption : ArrayUtil.isSameByProp(CAPTION)

};

export default LogicFn
