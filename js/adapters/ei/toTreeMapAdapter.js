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
const _isFossilFuel = label => label === "Coal" || label === "Natural gas" || label === "Oil";
const _crColor = label => _isFossilFuel(label) ? COLOR_FOSSIL_FUEL : COLOR_NOT_FOSSIL_FUEL;
const _sumByValue = (total, item) => total + item.value;
const _crTotal = data => data.reduce(_sumByValue, 0);
const _crItemValue = total => total ? (0, _formatNumber.default)((0, _AdapterFn.roundBy)(total, total > 100 ? 0 : 2)) : '';
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
const _crTotalToken = (title, value, onePercent) => title + " " + _crItemValue(value) + " (" + (0, _AdapterFn.roundBy)(value / onePercent, 0) + "%)";
const _crCaption = (json, option, total) => {
  const _arrTotal = json.data.reduce((arrTotal, _ref) => {
      let {
        label,
        value
      } = _ref;
      arrTotal[_isFossilFuel(label) ? 0 : 1] += value;
      return arrTotal;
    }, [0, 0]),
    _onePercent = total / 100,
    _titleF = _crTotalToken("Fossil Fuels", _arrTotal[0], _onePercent),
    _titleNf = _crTotalToken('Not Fossil Fuels', _arrTotal[1], _onePercent);
  return [(0, _AdapterFn.joinBy)(": ", option.title, option.dfTmTitle), _arrTotal[0] > _arrTotal[1] ? _titleF + ", " + _titleNf : _titleNf + ", " + _titleF];
};
const toTreeMapAdapter = () => {
  const adapter = {
    toConfig: (json, option) => {
      const {
          data
        } = json,
        {
          _itemKey,
          title
        } = option,
        total = _crTotal(data),
        [captionTitle, captionSubtitle] = _crCaption(json, option, total);
      return {
        config: (0, _pipe.default)((0, _configBuilderFn.crTreeMapConfig)(_crData(title, data, total)), (0, _configBuilderFn.fAddCaption)(captionTitle, captionSubtitle), (0, _configBuilderFn.fAdd)({
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