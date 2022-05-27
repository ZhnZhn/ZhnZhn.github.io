"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const crData = _ref => {
  let {
    data
  } = _ref;
  return (data || []).reduce(function (arr, _temp) {
    let {
      value,
      date
    } = _temp === void 0 ? {} : _temp;

    const _y = parseFloat(value);

    if (!(0, _fnAdapter._isNaN)(_y)) {
      arr.push([(0, _fnAdapter.ymdToUTC)(date), _y]);
    }

    return arr;
  }, []).sort(_fnAdapter.compareByDate);
};

const trOption = (option, json) => {
  const {
    title
  } = option,
        {
    unit
  } = json;
  option.title = (0, _fnAdapter.joinBy)(', ', title, unit);
};

let _adapter;

const EconomicsAdapter = () => _adapter || (_adapter = (0, _crAdapterType.default)({
  crData,
  trOption
}));

var _default = EconomicsAdapter;
exports.default = _default;
//# sourceMappingURL=EconomicsAdapter.js.map