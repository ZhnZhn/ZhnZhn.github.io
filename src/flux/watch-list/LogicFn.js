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

const _crMsgIsNotDone = (message) => ({
  isDone: false,
  message
})

export const crMsgNotFound = (
  itemType,
  name
) => _crMsgIsNotDone(notFoundItem(itemType, name))

export const crMsgGroupExisted = (
  caption
) => _crMsgIsNotDone(groupExisted(caption))

export const crMsgListExisted = (
  captionList,
  captionGroup
) => _crMsgIsNotDone(listExisted(captionList, captionGroup))

export const crMsgItemExisted = (
  caption,
  captionList
) => _crMsgIsNotDone(itemExisted(caption, captionList))


const _crAlert = (alertItemId, alertConfig) => ({
  isDone: false,
  alertItemId,
  ...alertConfig
})
  /* for DragDrop */
export const crAlertItemExisted = (
  dropId,
  dragId
) => _crAlert(`${dropId}:${dragId}`, ALERT_DND_ITEM)

export const crAlertListExisted = (
  dropGroupCaption,
  dragListCaption
) => _crAlert(`${dropGroupCaption}:${dragListCaption}`, ALERT_DND_LIST)
/* for DragDrop */
export const filter = imArrFactoryFilterByProp(CAPTION)
export const getArrayWithObj = imArrPush
export const getArrayWithRename = imArrFactoryEditByProp(CAPTION)

/* for DragDrop */
export const insertItemInArray = imArrInsertItem

/* for DragDrop */
export const findGroup = factoryFindInPropArrayByProp(GROUPS, CAPTION)
export const findList = factoryFindInPropArrayByProp(LISTS, CAPTION)
export const findIndex = arrFactoryFindIndexByProp('caption')
export const isInArraySameCaption = arrFactoryIsSameByProp(CAPTION)
