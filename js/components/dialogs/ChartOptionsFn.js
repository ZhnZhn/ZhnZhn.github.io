"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isCategoryItem = exports.crDialogChartOptions = exports.crChartOptions = void 0;
var _toPlural = _interopRequireDefault(require("../../utils/toPlural"));
var _arrFn = require("../../utils/arrFn");
var _CompItemType = require("../../constants/CompItemType");
var _ChartType = require("../../constants/ChartType");
var _ChartOptionsTypes = require("./ChartOptionsTypes");
const _isArr = Array.isArray,
  BLANK_CAPTION = '',
  CATEGORY_TYPES = [_ChartType.CHT_MAP, _ChartType.CHT_COLUMN_SET, _ChartType.CHT_COLUMN_CLUSTER, _ChartType.CHT_BAR_SET, _ChartType.CHT_BAR_CLUSTER, _ChartType.CHT_BAR_WITH_LABELS, _ChartType.CHT_DOT_SET, _ChartType.CHT_TREE_MAP, _ChartType.CHT_TREE_MAP_CLUSTER, _ChartType.CHT_TREE_MAP_2, _ChartType.CHT_TREE_MAP_2_CLUSTER],
  SPLINE_CONFIG = ['Spline', _ChartType.CHT_SPLINE],
  LINE_CONFIG = ['Line', _ChartType.CHT_LINE],
  AREA_CONFIG = ['Area', _ChartType.CHT_AREA],
  COLUMN_CONFIG = ['Column', _ChartType.CHT_COLUMN],
  YEARLY_BY_MONTH_CONFIG = ['Yearly by Months', _ChartType.CHT_AREA_YEARLY];
const _crDfConfig = configArr => {
  const _dfConfigArr = [...configArr];
  _dfConfigArr[0] = "Default: " + configArr[0];
  return _dfConfigArr;
};
const _crItem = configArr => ({
  caption: configArr[0],
  value: configArr[1],
  dim: configArr[2],
  compType: configArr[3],
  id: configArr[4]
});
const _crItems = arr => arr.filter(Boolean).map(_crItem);
const _isMonthly = mapFrequency => !mapFrequency || mapFrequency === 'M';
const _crDF3 = (oneCaption, mapFrequency) => _crItems([_crDfConfig(SPLINE_CONFIG), LINE_CONFIG, _isMonthly(mapFrequency) && YEARLY_BY_MONTH_CONFIG, AREA_CONFIG, COLUMN_CONFIG, ["Bar: By " + oneCaption, _ChartType.CHT_BAR_SET], ["Bar+Labels: By " + oneCaption, _ChartType.CHT_BAR_WITH_LABELS], ["Column: By " + oneCaption, _ChartType.CHT_COLUMN_SET], ["Dots: By " + oneCaption, _ChartType.CHT_DOT_SET]]);
const _crDF = (captions, mapFrequency) => {
  const oneCaption = (0, _toPlural.default)(captions[0]) || 'Dim';
  return _crDF3(oneCaption, mapFrequency).concat(_crItems([["Map: By " + oneCaption, _ChartType.CHT_MAP, void 0, _CompItemType.CIT_EUROSTAT_MAP]]));
};
const _crT1 = () => _crItems([_crDfConfig(SPLINE_CONFIG), LINE_CONFIG, AREA_CONFIG]);
const _crT1A = () => _crItems([_crDfConfig(AREA_CONFIG), LINE_CONFIG, SPLINE_CONFIG]);
const _crT2 = () => [..._crT1(), _crItem(COLUMN_CONFIG)];
const _crYearlyByMonthItem = mapFrequency => _isMonthly(mapFrequency) && _crItem(YEARLY_BY_MONTH_CONFIG);
const _crT2A = (_, mapFrequency) => [..._crT2(), _crYearlyByMonthItem(mapFrequency)];
const _crColumBarItems = oneCaption => _crItems([["Column: By " + oneCaption, _ChartType.CHT_COLUMN_SET, oneCaption], ["Bar: By " + oneCaption, _ChartType.CHT_BAR_SET, oneCaption]]);
const _crColumBarClusterItems = oneCaption => _crItems([["Column: By " + oneCaption, _ChartType.CHT_COLUMN_SET, oneCaption], ["Column: By " + oneCaption + ": Cluster", _ChartType.CHT_COLUMN_CLUSTER, oneCaption], ["Bar: By " + oneCaption, _ChartType.CHT_BAR_SET, oneCaption], ["Bar: By " + oneCaption + ": Cluster", _ChartType.CHT_BAR_CLUSTER, oneCaption]]);
const _crT2AE = (captions, mapFrequency) => [..._crT2A(captions, mapFrequency), ..._crColumBarClusterItems("Dim")];
const _crT3 = _ref => {
  let [oneCaption] = _ref;
  return [..._crT2(), ..._crColumBarClusterItems(oneCaption)];
};
const _crT3C = _ref2 => {
  let [oneCaption] = _ref2;
  return [..._crT2(), ..._crColumBarItems(oneCaption)];
};
const _crT3CA = () => _crT3C(["Dim"]);
const _crT3B = (_ref3, mapFrequency) => {
  let [oneCaption] = _ref3;
  return [_crItem(_crDfConfig(SPLINE_CONFIG)), _crYearlyByMonthItem(mapFrequency), ..._crColumBarClusterItems(oneCaption)];
};
const _crTreeMapItem = (caption, id) => _crItem(["TreeMap: By " + caption, _ChartType.CHT_TREE_MAP, caption, void 0, id]);
const _crT3A = _ref4 => {
  let [oneCaption] = _ref4;
  return [..._crT3([oneCaption]), _crTreeMapItem(oneCaption), _crItem(["TreeMap: By " + oneCaption + ": Cluster", _ChartType.CHT_TREE_MAP_CLUSTER, oneCaption])];
};
const _crT3AB = _ref5 => {
  let [oneCaption, twoCaption] = _ref5;
  return [..._crT3([oneCaption]), _crTreeMapItem(twoCaption, _ChartOptionsTypes.TYPE_T3AB)];
};
const _crT3A2 = _ref6 => {
  let [oneCaption] = _ref6;
  return [..._crT3A([oneCaption]), _crItem(["TreeMap: By " + oneCaption + ": Depth 2", _ChartType.CHT_TREE_MAP_2, oneCaption]), _crItem(["TreeMap: By " + oneCaption + ": Depth 2: Cluster", _ChartType.CHT_TREE_MAP_2_CLUSTER, oneCaption])];
};
const _r = {
  DF: _crDF,
  t1: _crT1,
  t1a: _crT1A,
  t2: _crT2,
  t2a: _crT2A,
  t2ae: _crT2AE,
  t3: _crT3,
  t3a: _crT3A,
  t3a2: _crT3A2,
  t3b: _crT3B,
  [_ChartOptionsTypes.TYPE_T3AB]: _crT3AB,
  t3c: _crT3C,
  t3ca: _crT3CA,
  df3: _crDF3
};
const _crCaptions = _ref7 => {
  let {
    configs,
    selectProps,
    oneCaption = BLANK_CAPTION,
    twoCaption = BLANK_CAPTION
  } = _ref7;
  const _arr = configs || selectProps;
  return _isArr(_arr) ? _arr.map(item => item.caption || BLANK_CAPTION) : [oneCaption, twoCaption];
};
const _crChartOptionsImpl = (chartsType, captions, mapFrequency) => (_r[chartsType] || _r.DF)(captions, mapFrequency).filter(Boolean);
const crDialogChartOptions = function (dialogOption, _temp) {
  let {
    mapFrequency
  } = _temp === void 0 ? {} : _temp;
  const {
    chartsType,
    mapFrequency: mF,
    dfProps
  } = dialogOption;
  return _crChartOptionsImpl(chartsType, _crCaptions(dialogOption), mapFrequency || mF || (dfProps || {}).mapFrequency);
};
exports.crDialogChartOptions = crDialogChartOptions;
const crChartOptions = (selectProps, chartsType, mapFrequency) => _crChartOptionsImpl(chartsType, _crCaptions({
  selectProps
}), mapFrequency);
exports.crChartOptions = crChartOptions;
const _isCategory = (0, _arrFn.isInArrStr)(CATEGORY_TYPES);
const isCategoryItem = chartItem => !!chartItem && _isCategory(chartItem.value);
exports.isCategoryItem = isCategoryItem;
//# sourceMappingURL=ChartOptionsFn.js.map