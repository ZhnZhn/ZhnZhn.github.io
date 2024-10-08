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
  isClose=true,
  cn
) => ({
  name,
  onClick,
  isClose,
  cn
})

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
