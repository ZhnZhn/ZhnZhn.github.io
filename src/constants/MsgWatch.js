
export const WATCH_SAVED = 'Watch List has been saved.'
export const WATCH_PREV = 'Watch List has not been edited\nfrom previous save.'

const _IS_ALREADY_EXISTED_ = 'is already existed.'
export const notFoundItem = (
  itemType,
  captionGroup
) => `The ${itemType} witn name ${captionGroup} not found.`

export const groupExisted = (
  caption
) => `Group with name ${caption} ${_IS_ALREADY_EXISTED_}`
export const listExisted = (
  captionList,
  captionGroup
) => `List with name ${captionList} in Group ${captionGroup} ${_IS_ALREADY_EXISTED_}`
export const itemExisted = (
  caption,
  captionList
) => `Item with name ${caption} in List ${captionList} ${_IS_ALREADY_EXISTED_}`
export const emptyName = (
  item
) => `${item} name can not be empty.`
export const notSelected = (
  item
) => `${item} is not selected.`

const _crDnDAlertConfig = (
  caption,
  descr
) => ({
  alertCaption: `Drag Drop ${caption}`,
  alertDescr: `${descr} ${_IS_ALREADY_EXISTED_}`
})
export const ALERT_DND_ITEM = _crDnDAlertConfig(
  'Item',
  'Item in List'
)
export const ALERT_DND_LIST = _crDnDAlertConfig(
  'List',
  'List in Group'
)
