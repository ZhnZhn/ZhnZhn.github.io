"use strict";

exports.__esModule = true;
exports.crPresentationRole = exports.crDialogRole = exports.crAriaLabelProp = void 0;
const crPresentationRole = isShow => ({
  role: "presentation",
  "aria-hidden": !isShow
});
exports.crPresentationRole = crPresentationRole;
const crDialogRole = (isShow, caption) => ({
  role: "dialog",
  tabIndex: "-1",
  "aria-hidden": !isShow,
  "aria-label": caption
});
exports.crDialogRole = crDialogRole;
const crAriaLabelProp = (_ref, dfAriaLabel) => {
  let {
    ariaLabel
  } = _ref;
  return {
    ariaLabel: ariaLabel || dfAriaLabel
  };
};
exports.crAriaLabelProp = crAriaLabelProp;
//# sourceMappingURL=a11yFn.js.map