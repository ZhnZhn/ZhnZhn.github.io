import { CL_ROW_PANE_TOPIC } from './styleFn';

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
  pageWidth,
  items,
  maxPages = 1,
  titleCl = CL_ROW_PANE_TOPIC
) => ({
  ...items,
  titleCl,
  pageWidth,
  maxPages
})
