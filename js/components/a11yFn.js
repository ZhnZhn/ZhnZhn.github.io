"use strict";

exports.__esModule = true;
exports.crPresentationRole = exports.crMenuItemRole = exports.crDialogRole = exports.crBtAriaLabelProps = exports.crAriaLabelProp = exports.crAriaExpandedProps = exports.crAriaComboboxProps = exports.ARL_OPEN_TABLE_MENU = exports.ARL_OPEN_ITEM_MENU = exports.ARL_OPEN_ITEMS_MENU = exports.ARL_OPEN_DIALOG_MENU = exports.ARL_OPEN_BROWSER_MENU = void 0;
var _fUseKey = require("./hooks/fUseKey");
const crPresentationRole = isShow => ({
  role: "presentation",
  hidden: !isShow
});
exports.crPresentationRole = crPresentationRole;
const crDialogRole = (isShow, caption) => ({
  role: "dialog",
  tabIndex: "-1",
  hidden: !isShow,
  "aria-label": caption
});
exports.crDialogRole = crDialogRole;
const crMenuItemRole = (onClick, tabIndex, isKeyUp) => ({
  role: "menuitem",
  tabIndex,
  onClick,
  [isKeyUp ? "onKeyUp" : "onKeyDown"]: onClick ? (0, _fUseKey.fOnKeyEnter)(onClick) : void 0
});
exports.crMenuItemRole = crMenuItemRole;
const _crOpenMenuAriaLabel = token => `Open ${token} menu`;
const ARL_OPEN_BROWSER_MENU = exports.ARL_OPEN_BROWSER_MENU = _crOpenMenuAriaLabel('browser');
const ARL_OPEN_DIALOG_MENU = exports.ARL_OPEN_DIALOG_MENU = _crOpenMenuAriaLabel('dialog');
const ARL_OPEN_ITEM_MENU = exports.ARL_OPEN_ITEM_MENU = _crOpenMenuAriaLabel('item');
const ARL_OPEN_ITEMS_MENU = exports.ARL_OPEN_ITEMS_MENU = _crOpenMenuAriaLabel('items');
const ARL_OPEN_TABLE_MENU = exports.ARL_OPEN_TABLE_MENU = _crOpenMenuAriaLabel('table');
const crAriaLabelProp = ({
  ariaLabel
}, dfAriaLabel) => ({
  "aria-label": ariaLabel || dfAriaLabel
});
exports.crAriaLabelProp = crAriaLabelProp;
const crBtAriaLabelProps = (title, ariaLabel = title) => ({
  title,
  ariaLabel
});
exports.crBtAriaLabelProps = crBtAriaLabelProps;
const crAriaExpandedProps = (isExpaned, controlsId) => ({
  "aria-expanded": isExpaned,
  "aria-controls": isExpaned ? controlsId : void 0
});
exports.crAriaExpandedProps = crAriaExpandedProps;
const crAriaComboboxProps = labelId => ({
  role: "combobox",
  "aria-autocomplete": "list",
  "aria-labelledby": labelId
});
exports.crAriaComboboxProps = crAriaComboboxProps;
//# sourceMappingURL=a11yFn.js.map