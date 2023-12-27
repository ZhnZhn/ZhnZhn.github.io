"use strict";

exports.__esModule = true;
exports.crPresentationRole = exports.crDialogRole = void 0;
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
//# sourceMappingURL=a11yFn.js.map