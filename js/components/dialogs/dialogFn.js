"use strict";

exports.__esModule = true;
exports.getItemValue = exports.crMsgs = exports.crIsToggleInit = exports.crIsId = void 0;
var _ChartOptionsFn = require("./ChartOptionsFn");
var _ChartOptionsTypes = require("./ChartOptionsTypes");
const crIsId = id => "is" + id + "Select";
exports.crIsId = crIsId;
const crIsToggleInit = selectProps => selectProps.reduce((toggleConfig, item) => {
  toggleConfig[crIsId(item.id)] = true;
  return toggleConfig;
}, Object.create(null));
exports.crIsToggleInit = crIsToggleInit;
const getItemValue = item => (item || {}).value;
exports.getItemValue = getItemValue;
const _geSelectPropsCaption = (selectProps, index) => selectProps[index].caption;
const crMsgs = (chartType, items, selectProps, msgOnNotSelected) => {
  const msgs = [];
  if (chartType.id === _ChartOptionsTypes.TYPE_T3AB) {
    if (!items[0]) {
      msgs.push(msgOnNotSelected(_geSelectPropsCaption(selectProps, 0)));
    }
  } else {
    let i = (0, _ChartOptionsFn.isCategoryItem)(chartType) ? 1 : 0;
    for (; i < selectProps.length; i++) {
      if (!items[i]) {
        msgs.push(msgOnNotSelected(_geSelectPropsCaption(selectProps, i)));
      }
    }
  }
  return msgs;
};
exports.crMsgs = crMsgs;
//# sourceMappingURL=dialogFn.js.map