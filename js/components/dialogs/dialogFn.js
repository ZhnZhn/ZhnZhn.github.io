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
const _crMsgs = function (items, selectProps, msgOnNotSelected, isItem) {
  if (isItem === void 0) {
    isItem = _isItemDf;
  }
  return selectProps.reduce((msgs, _, i) => {
    if (isItem(i) && !items[i]) {
      msgs.push(msgOnNotSelected(_geSelectPropsCaption(selectProps, i)));
    }
    return msgs;
  }, []);
};
const _fIsItem = (chartType, selectProps) => {
  const dfIsItem = i => i !== 0,
    {
      dim
    } = chartType;
  if (dim) {
    const dimIndex = selectProps.findIndex(item => item.caption === dim);
    return dimIndex !== -1 ? i => i !== dimIndex : dfIsItem;
  }
  return dfIsItem;
};
const _crIsItem = (chartType, selectProps) => _isChartTypeT3AB(chartType) ? i => i !== 1 : (0, _ChartOptionsFn.isCategoryItem)(chartType) ? _fIsItem(chartType, selectProps) : void 0;
const crMsgs = (chartType, items, selectProps, msgOnNotSelected) => _crMsgs(items, selectProps, msgOnNotSelected, _crIsItem(chartType, selectProps));
exports.crMsgs = crMsgs;
//# sourceMappingURL=dialogFn.js.map