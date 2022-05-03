"use strict";

exports.__esModule = true;
exports.default = void 0;

var _createrFns = require("./createrFns");

const createLoadOptions = (props, options) => {
  const {
    columnName,
    dataColumn,
    seriaColumnNames,
    loadId,
    fnValue,
    fnItemCaption,
    linkFn,
    dataSource,
    dfProps
  } = props || {},
        {
    one,
    fromDate,
    toDate,
    transform,
    chartType,
    seriaColor,
    seriaWidth
  } = options || {},
        {
    value: seriaType
  } = chartType || {},
        value = (0, _createrFns.getV)(one),
        caption = (0, _createrFns.getC)(one),
        _value = (0, _createrFns.isFn)(fnValue) ? fnValue(value) : value,
        _itemCaption = (0, _createrFns.isFn)(fnItemCaption) ? fnItemCaption(value) : void 0,
        [_transform, _subtitle] = transform ? [transform.value, transform.caption] : [];

  return {
    value: _value,
    transform: _transform,
    title: caption,
    subtitle: _subtitle,
    item: one,
    oneCaption: caption,
    itemCaption: _itemCaption,
    fromDate,
    toDate,
    columnName,
    dataColumn,
    loadId,
    linkFn,
    seriaType,
    seriaColor,
    seriaWidth,
    seriaColumnNames,
    dataSource,
    ...dfProps
  };
};

var _default = createLoadOptions;
exports.default = _default;
//# sourceMappingURL=type3.js.map