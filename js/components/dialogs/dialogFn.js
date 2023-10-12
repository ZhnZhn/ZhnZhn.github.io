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
const _isChartTypeT3AB = chartType => chartType && chartType.id === _ChartOptionsTypes.TYPE_T3AB;
const _isItemDf = () => true;
const _crMsgs = function (items, selectProps, msgOnNotSelected, fromIndex, isItem) {
  if (isItem === void 0) {
    isItem = _isItemDf;
  }
  const msgs = [];
  let i = fromIndex;
  for (; i < selectProps.length; i++) {
    if (isItem(i) && !items[i]) {
      msgs.push(msgOnNotSelected(_geSelectPropsCaption(selectProps, i)));
    }
  }
  return msgs;
};
const crMsgs = (chartType, items, selectProps, msgOnNotSelected) => {
  if (_isChartTypeT3AB(chartType)) {
    return _crMsgs(items, selectProps, msgOnNotSelected, 0, i => i !== 1);
  } else {
    return _crMsgs(items, selectProps, msgOnNotSelected, (0, _ChartOptionsFn.isCategoryItem)(chartType) ? 1 : 0);
  }
};
exports.crMsgs = crMsgs;
//# sourceMappingURL=dialogFn.js.map