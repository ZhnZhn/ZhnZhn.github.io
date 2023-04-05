"use strict";

exports.__esModule = true;
exports.getItemValue = exports.crIsToggleInit = exports.crIsId = void 0;
const crIsId = id => "is" + id + "Select";
exports.crIsId = crIsId;
const crIsToggleInit = selectProps => selectProps.reduce((toggleConfig, item) => {
  toggleConfig[crIsId(item.id)] = true;
  return toggleConfig;
}, Object.create(null));
exports.crIsToggleInit = crIsToggleInit;
const getItemValue = item => (item || {}).value;
exports.getItemValue = getItemValue;
//# sourceMappingURL=dialogFn.js.map