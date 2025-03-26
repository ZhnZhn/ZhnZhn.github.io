"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _createrFns = require("./createrFns");
const _toIds = (_ref, items) => {
  let {
    dfId
  } = _ref;
  const _arr = [dfId];
  items.forEach(function (_temp) {
    let {
      slice,
      value
    } = _temp === void 0 ? {} : _temp;
    if (slice) {
      _arr.push(slice[(0, _isTypeFn.getObjectKeys)(slice)[0]]);
    } else if (value) {
      //Eurostat case
      _arr.push(value);
    }
  });
  return _arr;
};
const createLoadOptions = (props, options) => {
  const {
      loadId,
      dataSource,
      dfProps = {}
    } = props || {},
    {
      isCategory,
      timeId,
      time,
      dfC,
      dfTitle,
      items = [],
      titles,
      dialogOptions,
      chartType,
      seriaColor,
      seriaWidth,
      selectOptions,
      _rt
    } = options || {},
    {
      value: seriaType,
      compType: zhCompType
    } = chartType || {},
    [itemCaption, title, subtitle] = (0, _createrFns.crCaptions)(items, titles),
    _items = _toIds(dfProps, items),
    _itemKey = (0, _createrFns.crItemKey)(_items, seriaType, time);
  return {
    dfC,
    dfTitle,
    ...dfProps,
    ...dialogOptions,
    _itemKey,
    _rt: (0, _createrFns.crRoundTo)(_rt),
    itemCaption: isCategory ? dfTitle || itemCaption : itemCaption,
    loadId,
    title,
    subtitle,
    seriaType,
    seriaColor,
    seriaWidth,
    zhCompType,
    time,
    timeId,
    dataSource,
    items,
    selectOptions
  };
};
var _default = exports.default = createLoadOptions;
//# sourceMappingURL=statN.js.map