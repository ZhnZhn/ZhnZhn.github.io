"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _JsonStatFn = require("../JsonStatFn");
var _ChartType = require("../../constants/ChartType");
var _crCategoryConfig = _interopRequireDefault(require("../crCategoryConfig"));
var _fnAdapter = require("./fnAdapter");
const _assign = Object.assign;
const _crTitle = (dfTitle, option) => dfTitle ? `${dfTitle}: All Items` : (0, _fnAdapter.crTitle)(option);
const _crSubtitle = (items, category) => {
  const _arr = [];
  (items || []).forEach(item => {
    const {
      slice,
      caption
    } = item || {};
    if (slice && !slice[category] && caption) {
      _arr.push((0, _fnAdapter.toUpperCaseFirst)(caption));
    }
  });
  return _arr.join(": ");
};
const _crConfig = (json, option) => _assign((0, _crCategoryConfig.default)(_crTitle(option.dfTitle, option), _crSubtitle(option.items, option.dfC), option.seriaType, option.seriaColor, (0, _JsonStatFn.crCategoryData)(json), option.isAlg), (0, _fnAdapter.crChartOption)(option.time, option, json)),
  _fCrConfig = seriaType => (json, option) => _crConfig(json, {
    ...option,
    seriaType
  });
const routerColumnBarSet = {
  [_ChartType.CHT_COLUMN_SET]: _fCrConfig(_ChartType.CHT_COLUMN),
  [_ChartType.CHT_COLUMN_CLUSTER]: _fCrConfig(_ChartType.CHT_COLUMN_CLUSTER),
  [_ChartType.CHT_BAR_SET]: _fCrConfig(_ChartType.CHT_BAR),
  [_ChartType.CHT_BAR_CLUSTER]: _fCrConfig(_ChartType.CHT_BAR_CLUSTER)
};
var _default = exports.default = routerColumnBarSet;
//# sourceMappingURL=toColumn.js.map