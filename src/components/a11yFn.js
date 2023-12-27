
export const crPresentationRole = (
  isShow
) => ({
  role: "presentation",
  "aria-hidden": !isShow
})

export const crDialogRole = (
  isShow,
  caption
) => ({
  role: "dialog",
  tabIndex: "-1",
  "aria-hidden": !isShow,
  "aria-label": caption
})
