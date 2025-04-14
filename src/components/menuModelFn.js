export const crSubItem = (
  id,
  name,
  cn
) => ({
  type: 'sub',
  id,
  name,
  cn
})

export const crItem = (
  name,
  onClick,
  isClose=!0,
  cn
) => ({
  name,
  onClick,
  isClose,
  cn
})

export const addToggleTo = (
  item,
  isInitial
) => (item.isInitial = !!isInitial, item)

export const crSliderMenu = (
  titleCl,
  pageWidth,
  maxPages,
  items
) => ({
  ...items,
  titleCl,
  pageWidth,
  maxPages
})
