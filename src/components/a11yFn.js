import { fOnKeyEnter } from './hooks/fUseKey';

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

export const crMenuItemRole = (
  onClick,
  tabIndex,
  isKeyUp
) => ({
  role: "menuitem",
  tabIndex,
  onClick,
  [isKeyUp ? "onKeyUp" : "onKeyDown"]: onClick
    ? fOnKeyEnter(onClick)
    : void 0
})

const _crOpenMenuAriaLabel = (
  token
) => `Open ${token} menu`;

export const ARL_OPEN_BROWSER_MENU = _crOpenMenuAriaLabel('browser')
export const ARL_OPEN_DIALOG_MENU = _crOpenMenuAriaLabel('dialog')
export const ARL_OPEN_ITEM_MENU = _crOpenMenuAriaLabel('item')
export const ARL_OPEN_ITEMS_MENU = _crOpenMenuAriaLabel('items')
export const ARL_OPEN_TABLE_MENU = _crOpenMenuAriaLabel('table')

export const crAriaLabelProp = (
  { ariaLabel },
  dfAriaLabel
) => ({
  "aria-label": ariaLabel || dfAriaLabel
})

export const crBtAriaLabelProps = (
  title,
  ariaLabel = title
) => ({
  title,
  ariaLabel
})

export const crAriaExpandedProps = (
  isExpaned,
  controlsId
) => ({
  "aria-expanded": isExpaned,
  "aria-controls": isExpaned
     ? controlsId
     : void 0
})

export const crAriaComboboxProps = (
  labelId
) => ({
  role: "combobox",
  "aria-autocomplete": "list",
  "aria-labelledby": labelId
})
