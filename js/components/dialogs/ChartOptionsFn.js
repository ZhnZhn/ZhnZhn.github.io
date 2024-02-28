"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isCategoryItem = exports.crDialogChartOptions = exports.crChartOptions = void 0;
var _toPlural = _interopRequireDefault(require("../../utils/toPlural"));
var _arrFn = require("../../utils/arrFn");
var _CompItemType = require("../../constants/CompItemType");
var _ChartOptionsTypes = require("./ChartOptionsTypes");
const _isArr = Array.isArray,
  BLANK_CAPTION = '',
  AREA = 'AREA',
  AREA_YEARLY = 'AREA_YEARLY',
  SPLINE = 'SPLINE',
  LINE = 'LINE',
  COLUMN = 'COLUMN',
  MAP = 'MAP',
  COLUMN_SET = 'COLUMN_SET',
  COLUMN_CLUSTER = 'COLUMN_CLUSTER',
  BAR_SET = 'BAR_SET',
  BAR_CLUSTER = 'BAR_CLUSTER',
  BAR_WITH_LABELS = 'BAR_WITH_LABELS',
  DOT_SET = 'DOT_SET',
  TREE_MAP = 'TREE_MAP',
  TREE_MAP_CLUSTER = 'TREE_MAP_CLUSTER',
  TREE_MAP_2 = 'TREE_MAP_2',
  TREE_MAP_2_CLUSTER = 'TREE_MAP_2_CLUSTER',
  CATEGORY_TYPES = [MAP, COLUMN_SET, COLUMN_CLUSTER, BAR_SET, BAR_CLUSTER, BAR_WITH_LABELS, DOT_SET, TREE_MAP, TREE_MAP_CLUSTER, TREE_MAP_2, TREE_MAP_2_CLUSTER],
  SPLINE_CONFIG = ['Spline', SPLINE],
  LINE_CONFIG = ['Line', LINE],
  AREA_CONFIG = ['Area', AREA],
  COLUMN_CONFIG = ['Column', COLUMN],
  YEARLY_BY_MONTH_CONFIG = ['Yearly by Months', AREA_YEARLY];
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
  id: configArr[4]
});
const _crItems = arr => arr.filter(Boolean).map(_crItem);
const _isMonthly = mapFrequency => !mapFrequency || mapFrequency === 'M';
const _crDF3 = (oneCaption, mapFrequency) => _crItems([_crDfConfig(SPLINE_CONFIG), LINE_CONFIG, _isMonthly(mapFrequency) && YEARLY_BY_MONTH_CONFIG, AREA_CONFIG, COLUMN_CONFIG, [`Bar: By ${oneCaption}`, BAR_SET], [`Bar+Labels: By ${oneCaption}`, BAR_WITH_LABELS], [`Column: By ${oneCaption}`, COLUMN_SET], [`Dots: By ${oneCaption}`, DOT_SET]]);
const _crDF = (captions, mapFrequency) => {
  const oneCaption = (0, _toPlural.default)(captions[0]) || 'Dim';
  return _crDF3(oneCaption, mapFrequency).concat(_crItems([[`Map: By ${oneCaption}`, MAP, void 0, _CompItemType.CIT_EUROSTAT_MAP]]));
};
const _crT1 = () => _crItems([_crDfConfig(SPLINE_CONFIG), LINE_CONFIG, AREA_CONFIG]);
const _crT1A = () => _crItems([_crDfConfig(AREA_CONFIG), LINE_CONFIG, SPLINE_CONFIG]);
const _crT2 = () => [..._crT1(), _crItem(COLUMN_CONFIG)];
const _crYearlyByMonthItem = mapFrequency => _isMonthly(mapFrequency) && _crItem(YEARLY_BY_MONTH_CONFIG);
const _crT2A = (_, mapFrequency) => [..._crT2(), _crYearlyByMonthItem(mapFrequency)];
const _crColumBarItems = oneCaption => _crItems([[`Column: By ${oneCaption}`, COLUMN_SET, oneCaption], [`Bar: By ${oneCaption}`, BAR_SET, oneCaption]]);
const _crColumBarClusterItems = oneCaption => _crItems([[`Column: By ${oneCaption}`, COLUMN_SET, oneCaption], [`Column: By ${oneCaption}: Cluster`, COLUMN_CLUSTER, oneCaption], [`Bar: By ${oneCaption}`, BAR_SET, oneCaption], [`Bar: By ${oneCaption}: Cluster`, BAR_CLUSTER, oneCaption]]);
const _crT2AE = (captions, mapFrequency) => [..._crT2A(captions, mapFrequency), ..._crColumBarClusterItems("Dim")];
const _crT3 = _ref => {
  let [oneCaption] = _ref;
  return [..._crT2(), ..._crColumBarClusterItems(oneCaption)];
};
const _crT3C = _ref2 => {
  let [oneCaption] = _ref2;
  return [..._crT2(), ..._crColumBarItems(oneCaption)];
};
const _crT3B = (_ref3, mapFrequency) => {
  let [oneCaption] = _ref3;
  return [_crItem(_crDfConfig(SPLINE_CONFIG)), _crYearlyByMonthItem(mapFrequency), ..._crColumBarClusterItems(oneCaption)];
};
const _crTreeMapItem = (caption, id) => _crItem([`TreeMap: By ${caption}`, TREE_MAP, caption, void 0, id]);
const _crT3A = _ref4 => {
  let [oneCaption] = _ref4;
  return [..._crT3([oneCaption]), _crTreeMapItem(oneCaption), _crItem([`TreeMap: By ${oneCaption}: Cluster`, TREE_MAP_CLUSTER, oneCaption])];
};
const _crT3AB = _ref5 => {
  let [oneCaption, twoCaption] = _ref5;
  return [..._crT3([oneCaption]), _crTreeMapItem(twoCaption, _ChartOptionsTypes.TYPE_T3AB)];
};
const _crT3A2 = _ref6 => {
  let [oneCaption] = _ref6;
  return [..._crT3A([oneCaption]), _crItem([`TreeMap: By ${oneCaption}: Depth 2`, TREE_MAP_2, oneCaption]), _crItem([`TreeMap: By ${oneCaption}: Depth 2: Cluster`, TREE_MAP_2_CLUSTER, oneCaption])];
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