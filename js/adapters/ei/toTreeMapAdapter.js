"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _formatNumber = _interopRequireDefault(require("../../utils/formatNumber"));
var _domSanitize = _interopRequireDefault(require("../../utils/domSanitize"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _AdapterFn = require("../AdapterFn");
var _CL = require("../CL");
const COLOR_FOSSIL_FUEL = "#658fb9",
  COLOR_NOT_FOSSIL_FUEL = "#6ea3d7";
const _sumByValue = (total, item) => total + item.value;
const _crTotal = data => data.reduce(_sumByValue, 0);
const _crColor = label => label === "Coal" || label === "Natural gas" || label === "Oil" ? COLOR_FOSSIL_FUEL : COLOR_NOT_FOSSIL_FUEL;
const _crData = (title, data, total) => {
  const _onePercent = total / 100,
    _rt = _onePercent > 1 ? 0 : 2;
  return data.map(item => {
    const {
        value,
        label
      } = item,
      _value = (0, _AdapterFn.roundBy)(value, _rt),
      _percent = (0, _AdapterFn.roundBy)(value / _onePercent, 0);
    return {
      color: _crColor(label),
      value: _value,
      title: (0, _domSanitize.default)(title),
      label: (0, _domSanitize.default)(label + " (" + _percent + "%)"),
      name: (0, _domSanitize.default)(label + "<br/><span class=\"" + _CL.CL_TREE_MAP_PERCENT_BLACK + "\">" + (0, _formatNumber.default)(_value) + " (" + _percent + "%)</span>")
    };
  });
};
const _crItemValue = total => total ? (0, _formatNumber.default)((0, _AdapterFn.roundBy)(total, total > 10 ? 0 : 2)) : '';
const toTreeMapAdapter = () => {
  const adapter = {
    toConfig: (json, option) => {
      const {
          data
        } = json,
        {
          _itemKey,
          title,
          dfTmTitle
        } = option,
        total = _crTotal(data);
      return {
        config: (0, _pipe.default)((0, _configBuilderFn.crTreeMapConfig)(_crData(title, data, total)), (0, _configBuilderFn.fAddCaption)(title, dfTmTitle), (0, _configBuilderFn.fAdd)({
          zhConfig: {
            id: _itemKey,
            key: _itemKey,
            itemCaption: title,
            itemTime: option.time,
            itemValue: _crItemValue(total),
            dataSource: option.dataSource
          }
        }), _configBuilderFn.toConfig)
      };
    }
  };
  return adapter;
};
var _default = exports.default = toTreeMapAdapter;
//# sourceMappingURL=toTreeMapAdapter.js.map