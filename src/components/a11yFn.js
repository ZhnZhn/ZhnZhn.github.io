
export const crPresentationRole = (
  isShow
) => ({
  role: "presentation",
  hidden: !isShow
})

export const crDialogRole = (
  isShow,
  caption
) => ({
  role: "dialog",
  tabIndex: "-1",
  hidden: !isShow,  
  "aria-label": caption
})

export const crAriaLabelProp = (
  { ariaLabel },
  dfAriaLabel
) => ({
  ariaLabel: ariaLabel || dfAriaLabel
})
