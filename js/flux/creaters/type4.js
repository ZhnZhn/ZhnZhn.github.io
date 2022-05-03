"use strict";

exports.__esModule = true;
exports.default = void 0;

var _createrFns = require("./createrFns");

const createLoadOptions = (props, options) => {
  const {
    fnValue,
    dataColumn,
    loadId,
    dataSource,
    isPremium,
    linkFn,
    dfProps
  } = props || {},
        {
    one,
    two,
    three,
    fromDate,
    toDate,
    hasSecondYAxis
  } = options || {},
        _oneV = (0, _createrFns.getV)(one),
        _oneC = (0, _createrFns.getC)(one),
        _twoV = (0, _createrFns.getV)(two),
        _twoC = (0, _createrFns.getC)(two),
        _threeV = (0, _createrFns.getV)(three),
        _threeC = (0, _createrFns.getC)(three),
        _value = (0, _createrFns.isFn)(fnValue) ? fnValue(_oneV, _twoV) : _oneV;

  return { ...dfProps,
    value: _value,
    title: _oneC,
    subtitle: _twoC,
    oneCaption: _oneC,
    twoCaption: _twoC,
    threeCaption: _threeC,
    one: _oneV,
    two: _twoV,
    three: _threeV,
    items: [one, two, three || {}],
    fromDate,
    toDate,
    dataColumn,
    loadId,
    isPremium,
    dataSource,
    hasSecondYAxis,
    linkFn
  };
};

var _default = createLoadOptions;
exports.default = _default;
//# sourceMappingURL=type4.js.map