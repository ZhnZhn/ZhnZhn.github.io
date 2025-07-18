"use strict";

exports.__esModule = true;
exports.crPresentationRole = exports.crMenuItemRole = exports.crDialogRole = exports.crBtAriaLabelProps = exports.crAriaLabelProp = exports.crAriaExpandedProps = exports.crAriaComboboxProps = void 0;
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
const crAriaLabelProp = (_ref, dfAriaLabel) => {
  let {
    ariaLabel
  } = _ref;
  return {
    ariaLabel: ariaLabel || dfAriaLabel
  };
};
exports.crAriaLabelProp = crAriaLabelProp;
const crBtAriaLabelProps = function (title, ariaLabel) {
  if (ariaLabel === void 0) {
    ariaLabel = title;
  }
  return {
    title,
    ariaLabel
  };
};
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