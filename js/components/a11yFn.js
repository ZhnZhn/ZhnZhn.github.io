"use strict";

exports.__esModule = true;
exports.crPresentationRole = exports.crDialogRole = exports.crAriaLabelProp = void 0;
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