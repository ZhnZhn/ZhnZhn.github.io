"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isCategoryItem = exports.crChartOptions = void 0;
var _toPlural = _interopRequireDefault(require("../../utils/toPlural"));
var _arrFn = require("../../utils/arrFn");
var _CompItemType = require("../../constants/CompItemType");
var _ChartType = require("../../constants/ChartType");
var _ChartOptionsTypes = require("./ChartOptionsTypes");
const _isArr = Array.isArray,
  BLANK_CAPTION = '',
  CATEGORY_TYPES = [_ChartType.CHT_MAP, _ChartType.CHT_COLUMN_SET, _ChartType.CHT_COLUMN_CLUSTER, _ChartType.CHT_BAR_SET, _ChartType.CHT_BAR_CLUSTER, _ChartType.CHT_BAR_WITH_LABELS, _ChartType.CHT_DOT_SET, _ChartType.CHT_TREE_MAP, _ChartType.CHT_TREE_MAP_CLUSTER, _ChartType.CHT_BAR_TREE_MAP],
  SPLINE_CONFIG = ['Spline', _ChartType.CHT_SPLINE],
  LINE_CONFIG = ['Line', _ChartType.CHT_LINE],
  AREA_CONFIG = ['Area', _ChartType.CHT_AREA],
  COLUMN_CONFIG = ['Column', _ChartType.CHT_COLUMN],
  YEARLY_BY_MONTH_CONFIG = ['Yearly by Months', _ChartType.CHT_AREA_YEARLY];
const _crDfConfig = configArr => {
  const _dfConfigArr = [...configArr];
  _dfConfigArr[0] = `Default: ${configArr[0]}`;
  return _dfConfigArr;
};
const _crItem = configArr => ({
  caption: configArr[0],
  value: configArr[1],
  dim: configArr[2],
  compType: configArr[3],
  id: configArr[4],
  cId: configArr[5]
});
const _crItems = arr => arr.filter(Boolean).map(_crItem);
const _isMonthly = mapFrequency => !mapFrequency || mapFrequency === 'M';
const _crDF3 = (oneCaption, mapFrequency) => _crItems([_crDfConfig(SPLINE_CONFIG), LINE_CONFIG, _isMonthly(mapFrequency) && YEARLY_BY_MONTH_CONFIG, AREA_CONFIG, COLUMN_CONFIG, [`Bar: By ${oneCaption}`, _ChartType.CHT_BAR_SET], [`Bar+Labels: By ${oneCaption}`, _ChartType.CHT_BAR_WITH_LABELS], [`Column: By ${oneCaption}`, _ChartType.CHT_COLUMN_SET], [`Dots: By ${oneCaption}`, _ChartType.CHT_DOT_SET]]);
const _crDF = (captions, mapFrequency) => {
  const oneCaption = (0, _toPlural.default)(captions[0]) || 'Dim';
  return _crDF3(oneCaption, mapFrequency).concat(_crItems([[`Map: By ${oneCaption}`, _ChartType.CHT_MAP, void 0, _CompItemType.CIT_EUROSTAT_MAP]]));
};
const _crTes = (captions, mapFrequency, selectProps) => {
  const chartOptions = _crDF(captions, mapFrequency),
    twoCaption = captions[1] || 'Dim';
  chartOptions.splice(7, 0, _crItem([`Bar: By ${(0, _toPlural.default)(twoCaption)}`, _ChartType.CHT_BAR_SET, twoCaption, void 0, void 0, (selectProps[1] || {}).id]));
  return chartOptions;
};
const _crT1 = () => _crItems([_crDfConfig(SPLINE_CONFIG), LINE_CONFIG, AREA_CONFIG]);
const _crT1A = () => _crItems([_crDfConfig(AREA_CONFIG), LINE_CONFIG, SPLINE_CONFIG]);
const _crT2 = () => [..._crT1(), _crItem(COLUMN_CONFIG)];
const _crYearlyByMonthItem = mapFrequency => _isMonthly(mapFrequency) && _crItem(YEARLY_BY_MONTH_CONFIG);
const _crT2A = (_, mapFrequency) => [..._crT2(), _crYearlyByMonthItem(mapFrequency)];
const _crColumBarItems = oneCaption => _crItems([[`Column: By ${oneCaption}`, _ChartType.CHT_COLUMN_SET, oneCaption], [`Bar: By ${oneCaption}`, _ChartType.CHT_BAR_SET, oneCaption]]);
const _crColumBarClusterItems = oneCaption => _crItems([[`Column: By ${oneCaption}`, _ChartType.CHT_COLUMN_SET, oneCaption], [`Column: By ${oneCaption}: Cluster`, _ChartType.CHT_COLUMN_CLUSTER, oneCaption], [`Bar: By ${oneCaption}`, _ChartType.CHT_BAR_SET, oneCaption], [`Bar: By ${oneCaption}: Cluster`, _ChartType.CHT_BAR_CLUSTER, oneCaption]]);
const _crT2AE = (captions, mapFrequency) => [..._crT2A(captions, mapFrequency), ..._crColumBarClusterItems("Dim")];
const _crT3 = _ref => {
  let [oneCaption] = _ref;
  return [..._crT2(), ..._crColumBarClusterItems(oneCaption)];
};
const _crT3C = _ref2 => {
  let [oneCaption] = _ref2;
  return [..._crT2(), ..._crColumBarItems(oneCaption)];
};
const _crT3C2 = _ref3 => {
  let [oneCaption, twoCaption] = _ref3;
  return [..._crT3C([oneCaption]), ..._crColumBarItems(twoCaption)];
};
const _crT3CA = () => _crT3C(["Dim"]);
const _crT3B = (_ref4, mapFrequency) => {
  let [oneCaption] = _ref4;
  return [..._crT2(), _crYearlyByMonthItem(mapFrequency), ..._crColumBarClusterItems(oneCaption)];
};
const _crTreeMapItem = (caption, id) => _crItem([`TreeMap: By ${caption}`, _ChartType.CHT_TREE_MAP, caption, void 0, id]);
const _crBarTreeMapItem = (caption, id) => _crItem([`Bar: By ${caption}`, _ChartType.CHT_BAR_TREE_MAP, caption, void 0, id]);
const _crT3A = _ref5 => {
  let [oneCaption] = _ref5;
  return [..._crT3([oneCaption]), _crTreeMapItem(oneCaption), _crItem([`TreeMap: By ${oneCaption}: Cluster`, _ChartType.CHT_TREE_MAP_CLUSTER, oneCaption])];
};
const _crT3AB = _ref6 => {
  let [oneCaption, twoCaption] = _ref6;
  return [..._crT3([oneCaption]), _crTreeMapItem(twoCaption, _ChartOptionsTypes.TYPE_T3AB)];
};
const _crT3AB2 = _ref7 => {
  let [oneCaption, twoCaption] = _ref7;
  return [..._crT3([oneCaption]), _crBarTreeMapItem(twoCaption, _ChartOptionsTypes.TYPE_T3AB), _crTreeMapItem(twoCaption, _ChartOptionsTypes.TYPE_T3AB)];
};
const _crT3AC = _ref8 => {
  let [oneCaption] = _ref8;
  return [..._crT3([oneCaption]), _crItem([`TreeMap (60, 90): By ${oneCaption}`, _ChartType.CHT_TREE_MAP_CLUSTER, oneCaption])];
};
const _r = {
  DF: _crDF,
  tes: _crTes,
  tc: _crColumBarClusterItems,
  t1: _crT1,
  t1a: _crT1A,
  t2: _crT2,
  t2a: _crT2A,
  t2ae: _crT2AE,
  t3: _crT3,
  t3a: _crT3A,
  t3b: _crT3B,
  [_ChartOptionsTypes.TYPE_T3AB]: _crT3AB,
  t3ab2: _crT3AB2,
  t3ac: _crT3AC,
  t3c: _crT3C,
  t3c2: _crT3C2,
  t3ca: _crT3CA,
  df3: _crDF3
};
const _crCaptions = selectPropsOrConfigs => _isArr(selectPropsOrConfigs) ? selectPropsOrConfigs.map(item => item.caption || BLANK_CAPTION) : [BLANK_CAPTION, BLANK_CAPTION];
const _crChartOptionsImpl = (chartsType, captions, mapFrequency, selectProps) => (_r[chartsType] || _r.DF)(captions, mapFrequency, selectProps).filter(Boolean);
const crChartOptions = (selectPropsOrConfigs, chartsType, mapFrequency) => _crChartOptionsImpl(chartsType, _crCaptions(selectPropsOrConfigs), mapFrequency, selectPropsOrConfigs);
exports.crChartOptions = crChartOptions;
const _isCategory = (0, _arrFn.isInArrStr)(CATEGORY_TYPES);
const isCategoryItem = chartItem => !!chartItem && _isCategory(chartItem.value);
exports.isCategoryItem = isCategoryItem;
//# sourceMappingURL=ChartOptionsFn.js.map