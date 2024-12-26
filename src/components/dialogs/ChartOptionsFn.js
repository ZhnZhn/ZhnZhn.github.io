import { isInArrStr } from "../../utils/arrFn";
import { crGetRoute } from "../../utils/crRouter";
import toPlural from "../../utils/toPlural";

import { CIT_EUROSTAT_MAP } from "../../constants/CompItemType";
import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_LINE,
  CHT_COLUMN,
  CHT_AREA_YEARLY,

  CHT_COLUMN_SET,
  CHT_COLUMN_CLUSTER,
  CHT_BAR_SET,
  CHT_BAR_CLUSTER,
  CHT_BAR_WITH_LABELS,

  CHT_TREE_MAP,
  CHT_TREE_MAP_CLUSTER,
  CHT_BAR_TREE_MAP,

  CHT_MAP,
  CHT_DOT_SET
} from "../../constants/ChartType";

import { TYPE_T3AB } from "./ChartOptionsTypes";

const _isArr = Array.isArray
, BLANK_CAPTION = ""
, DIM_CAPTION = "Dim"

, CATEGORY_TYPES = [
    CHT_MAP,
    CHT_COLUMN_SET, CHT_COLUMN_CLUSTER,
    CHT_BAR_SET, CHT_BAR_CLUSTER, CHT_BAR_WITH_LABELS,
    CHT_DOT_SET,
    CHT_TREE_MAP, CHT_TREE_MAP_CLUSTER,
    CHT_BAR_TREE_MAP
]

, SPLINE_CONFIG = ["Spline", CHT_SPLINE]
, LINE_CONFIG = ["Line", CHT_LINE]
, AREA_CONFIG = ["Area", CHT_AREA]
, COLUMN_CONFIG = ["Column", CHT_COLUMN]
, YEARLY_BY_MONTH_CONFIG = ["Yearly by Months" , CHT_AREA_YEARLY];

const _crDfConfig = arrConfig => {
  const _arrDfConfig = [...arrConfig];
  _arrDfConfig[0] = `Default: ${arrConfig[0]}`
  return _arrDfConfig;
}
const _addPropertyTo = (
  obj,
  propName,
  value
) => {
  if (value != null) {
    obj[propName] = value
  }
};
const _crItem = arrConfig => {
  const item = {
    caption: arrConfig[0],
    value: arrConfig[1]
  };
  _addPropertyTo(item, "dim", arrConfig[2])
  _addPropertyTo(item, "compType", arrConfig[3])
  _addPropertyTo(item, "id", arrConfig[4])
  _addPropertyTo(item, "cId", arrConfig[5])
  return item;
};

const _crItems = (arr) => arr
  .filter(Boolean)
  .map(_crItem);

const _isMonthly = (
  mapFrequency
) => !mapFrequency || mapFrequency === "M";

const _fCrCaptionBy = (
  prefix
) => (
  sufix,
  isCluster
) => `${prefix}: By ${sufix}${isCluster ? ": Cluster" : ""}`
, _crCaptionBarBy = _fCrCaptionBy("Bar")
, _crCaptionColumnBy = _fCrCaptionBy("Column")
, _crCaptionTreeMapBy = _fCrCaptionBy("TreeMap")

, _crCaptionBarLabelsBy = _fCrCaptionBy("Bar+Labels")
, _crCaptionDotsBy = _fCrCaptionBy("Dots")
, _crCaptionMapBy = _fCrCaptionBy("Map")
, _crCaptionTreeMap6090 = _fCrCaptionBy("TreeMap (60, 90)")

, _fCrItem = (
  crCaption,
  chartType,
  isCluster
) => (
  caption,
  id
) => _crItem([
  crCaption(caption, isCluster),
  chartType,
  caption,
  void 0,
  id
]);

const _crDF3 = (
  oneCaption,
  mapFrequency
) => _crItems([
  _crDfConfig(SPLINE_CONFIG),
  LINE_CONFIG,
  _isMonthly(mapFrequency) && YEARLY_BY_MONTH_CONFIG,
  AREA_CONFIG,
  COLUMN_CONFIG,
  [_crCaptionBarBy(oneCaption), CHT_BAR_SET],
  [_crCaptionBarLabelsBy(oneCaption), CHT_BAR_WITH_LABELS],
  [_crCaptionColumnBy(oneCaption), CHT_COLUMN_SET],
  [_crCaptionDotsBy(oneCaption), CHT_DOT_SET]
]);

const _crDF = (
  captions,
  mapFrequency
) => {
  const oneCaption = toPlural(captions[0]) || DIM_CAPTION;
  return _crDF3(oneCaption, mapFrequency)
    .concat([
      _crItem([_crCaptionMapBy(oneCaption), CHT_MAP, void 0, CIT_EUROSTAT_MAP])
    ]);
};

const _crTes = (
  captions,
  mapFrequency,
  selectProps
) => {
  const chartOptions = _crDF(captions, mapFrequency)
  , twoCaption = captions[1] || DIM_CAPTION;
  chartOptions.splice(7, 0, _crItem(
    [_crCaptionBarBy(toPlural(twoCaption)), CHT_BAR_SET, twoCaption, void 0, void 0, (selectProps[1] || {}).id]
  ))
  return chartOptions;
};

const _crT1 = () => _crItems([
  _crDfConfig(SPLINE_CONFIG),
  LINE_CONFIG,
  AREA_CONFIG
]);

const _crT2 = () => [
  ..._crT1(),
  _crItem(COLUMN_CONFIG)
];

const _crYearlyByMonthItem = (
  mapFrequency
) => _isMonthly(mapFrequency)
  && _crItem(YEARLY_BY_MONTH_CONFIG);

const _crT2A = (_, mapFrequency) => [
  ..._crT2(),
  _crYearlyByMonthItem(mapFrequency)
];

const _crColumnSetItem = _fCrItem(_crCaptionColumnBy, CHT_COLUMN_SET)
, _crColumnClusterItem = _fCrItem(_crCaptionColumnBy, CHT_COLUMN_CLUSTER, !0)
, _crBarSetItem = _fCrItem(_crCaptionBarBy, CHT_BAR_SET)
, _crBarClusterItem = _fCrItem(_crCaptionBarBy, CHT_BAR_CLUSTER, !0);

const _crColumBarItems = (
  oneCaption
) => [
  _crColumnSetItem(oneCaption),
  _crBarSetItem(oneCaption)
];

const _crColumBarClusterItems = (
  oneCaption
) => [
  _crColumnSetItem(oneCaption),
  _crColumnClusterItem(oneCaption),
  _crBarSetItem(oneCaption),
  _crBarClusterItem(oneCaption)
];

const _crT2AE = (
  captions,
  mapFrequency
) => [
  ..._crT2A(captions, mapFrequency),
  ..._crColumBarClusterItems(DIM_CAPTION)
];

const _crT3 = ([oneCaption]) => [
  ..._crT2(),
  ..._crColumBarClusterItems(oneCaption)
];
const _crT3C = ([oneCaption]) => [
  ..._crT2(),
  ..._crColumBarItems(oneCaption)
];
const _crT3C2 = ([oneCaption, twoCaption]) => [
  ..._crT3C([oneCaption]),
  ..._crColumBarItems(twoCaption)
];
const _crT3CA = () => _crT3C([DIM_CAPTION])

const _crT3B = (
  [oneCaption],
  mapFrequency
) => [
  ..._crT2(),
  _crYearlyByMonthItem(mapFrequency),
  ..._crColumBarClusterItems(oneCaption)
];

const _crTreeMapItem = _fCrItem(_crCaptionTreeMapBy, CHT_TREE_MAP)
, _crTreeMapClusterItem = _fCrItem(_crCaptionTreeMapBy, CHT_TREE_MAP_CLUSTER, !0)
, _crTreeMap6090Item = _fCrItem(_crCaptionTreeMap6090, CHT_TREE_MAP_CLUSTER)
, _crBarTreeMapItem = _fCrItem(_crCaptionBarBy, CHT_BAR_TREE_MAP);

const _crT3A = ([oneCaption]) => [
  ..._crT3([oneCaption]),
  _crTreeMapItem(oneCaption),
  _crTreeMapClusterItem(oneCaption)
];

const _crT3AB = ([oneCaption, twoCaption]) => [
  ..._crT3([oneCaption]),
  _crTreeMapItem(twoCaption, TYPE_T3AB)
];
const _crT3AB2 = ([oneCaption, twoCaption]) => [
  ..._crT3([oneCaption]),
  _crBarTreeMapItem(twoCaption, TYPE_T3AB),
  _crTreeMapItem(twoCaption, TYPE_T3AB)
];

const _crT3AC = ([oneCaption]) => [
  ..._crT3([oneCaption]),
  _crTreeMap6090Item(oneCaption)
];

const _getCrChartOptions = crGetRoute({
  tes: _crTes,
  tc: _crColumBarClusterItems,
  t1: _crT1,
  t2: _crT2,
  t2a: _crT2A,
  t2ae: _crT2AE,
  t3: _crT3,
  t3a: _crT3A,
  t3b: _crT3B,
  [TYPE_T3AB]: _crT3AB,
  t3ab2: _crT3AB2,
  t3ac: _crT3AC,
  t3c: _crT3C,
  t3c2: _crT3C2,
  t3ca: _crT3CA,
  df3: _crDF3
}, _crDF);

const _crCaptions = (
  selectPropsOrConfigs
) => _isArr(selectPropsOrConfigs)
  ? selectPropsOrConfigs.map(item => item.caption || BLANK_CAPTION)
  : [BLANK_CAPTION, BLANK_CAPTION];

const _crChartOptionsImpl = (
  chartsType,
  captions,
  mapFrequency,
  selectProps
) => _getCrChartOptions(chartsType)(
  captions,
  mapFrequency,
  selectProps
).filter(Boolean);

export const crChartOptions = (
  selectPropsOrConfigs,
  chartsType,
  mapFrequency
) => _crChartOptionsImpl(
  chartsType,
  _crCaptions(selectPropsOrConfigs),
  mapFrequency,
  selectPropsOrConfigs
)

const _isCategory = isInArrStr(CATEGORY_TYPES);
export const isCategoryItem = (
  chartItem
) => !!chartItem && _isCategory(chartItem.value)
