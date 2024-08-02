"use strict";

exports.__esModule = true;
exports.crAriaExpandedProps = exports.crAriaComboboxProps = void 0;
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
//# sourceMappingURL=ariaFn.js.map