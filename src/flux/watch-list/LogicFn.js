import Msg from '../../constants/Msg';

import ImArrayUtil from '../../utils/ImArrayUtil';
import ObjUtil from '../../utils/ObjUtil';
import ArrayUtil from '../../utils/ArrayUtil';

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

  filter : ImArrayUtil.filterByProp.bind(null, 'caption'),
  getArrayWithObj : ImArrayUtil.push,

  getArrayWithRename(arr, index, caption){
    return [
      ...arr.slice(0, index),
      Object.assign({}, arr[index], {caption}),
      ...arr.slice(index+1)
    ]
  },

  /* for DragDrop */
  insertItemInArray : ImArrayUtil.insertItem,
  /* for DragDrop */

  findGroup : ObjUtil.findInPropArrayByPropItem.bind(null, 'groups', 'caption'),
  findList : ObjUtil.findInPropArrayByPropItem.bind(null, 'lists', 'caption'),

  findIndex : ArrayUtil.findIndexByProp.bind(null, 'caption'),
  checkIsInArraySameCaption : ArrayUtil.checkSameByProp.bind(null, 'caption')

};

export default LogicFn
