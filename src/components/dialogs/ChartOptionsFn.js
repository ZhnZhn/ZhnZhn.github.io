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

const _crDfConfig = configArr => {
  const _dfConfigArr = [...configArr];
  _dfConfigArr[0] = `Default: ${configArr[0]}`
  return _dfConfigArr;
}
const _crItem = configArr => ({
  caption: configArr[0],
  value: configArr[1],
  dim: configArr[2],
  compType: configArr[3],
  id: configArr[4],
  cId: configArr[5]
});
const _crItems = (arr) => arr
  .filter(Boolean)
  .map(_crItem);

const _isMonthly = (
  mapFrequency
) => !mapFrequency || mapFrequency === "M";

const _crDF3 = (
  oneCaption,
  mapFrequency
) => _crItems([
  _crDfConfig(SPLINE_CONFIG),
  LINE_CONFIG,
  _isMonthly(mapFrequency) && YEARLY_BY_MONTH_CONFIG,
  AREA_CONFIG,
  COLUMN_CONFIG,
  [`Bar: By ${oneCaption}`, CHT_BAR_SET],
  [`Bar+Labels: By ${oneCaption}`, CHT_BAR_WITH_LABELS],
  [`Column: By ${oneCaption}`, CHT_COLUMN_SET],
  [`Dots: By ${oneCaption}`, CHT_DOT_SET]
]);

const _crDF = (
  captions,
  mapFrequency
) => {
  const oneCaption = toPlural(captions[0]) || "Dim";
  return _crDF3(oneCaption, mapFrequency)
    .concat(_crItems([
       [`Map: By ${oneCaption}` , CHT_MAP, void 0, CIT_EUROSTAT_MAP]
    ]));
};

const _crTes = (
  captions,
  mapFrequency,
  selectProps
) => {
  const chartOptions = _crDF(captions, mapFrequency)
  , twoCaption = captions[1] || "Dim";
  chartOptions.splice(7, 0, _crItem(
    [`Bar: By ${toPlural(twoCaption)}`, CHT_BAR_SET, twoCaption, void 0, void 0, (selectProps[1] || {}).id]
  ))
  return chartOptions;
};

const _crT1 = () => _crItems([
  _crDfConfig(SPLINE_CONFIG),
  LINE_CONFIG,
  AREA_CONFIG
]);
const _crT1A = () => _crItems([
  _crDfConfig(AREA_CONFIG),
  LINE_CONFIG,
  SPLINE_CONFIG
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

const _crColumBarItems = (oneCaption) => _crItems([
  [`Column: By ${oneCaption}`, CHT_COLUMN_SET, oneCaption],
  [`Bar: By ${oneCaption}`, CHT_BAR_SET, oneCaption],
]);

const _crColumBarClusterItems = (oneCaption) => _crItems([
  [`Column: By ${oneCaption}`, CHT_COLUMN_SET, oneCaption],
  [`Column: By ${oneCaption}: Cluster`, CHT_COLUMN_CLUSTER, oneCaption],
  [`Bar: By ${oneCaption}`, CHT_BAR_SET, oneCaption],
  [`Bar: By ${oneCaption}: Cluster`, CHT_BAR_CLUSTER, oneCaption]
]);

const _crT2AE = (
  captions,
  mapFrequency
) => [
  ..._crT2A(captions, mapFrequency),
  ..._crColumBarClusterItems("Dim")
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
const _crT3CA = () => _crT3C(["Dim"])

const _crT3B = (
  [oneCaption],
  mapFrequency
) => [
  ..._crT2(),
  _crYearlyByMonthItem(mapFrequency),
  ..._crColumBarClusterItems(oneCaption)
];

const _crTreeMapItem = (
  caption,
  id
) => _crItem([`TreeMap: By ${caption}`, CHT_TREE_MAP, caption, void 0, id]);
const _crBarTreeMapItem = (
  caption,
  id
) => _crItem([`Bar: By ${caption}`, CHT_BAR_TREE_MAP, caption, void 0, id]);

const _crT3A = ([oneCaption]) => [
  ..._crT3([oneCaption]),
  _crTreeMapItem(oneCaption),
  _crItem([`TreeMap: By ${oneCaption}: Cluster`, CHT_TREE_MAP_CLUSTER, oneCaption])
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
  _crItem([`TreeMap (60, 90): By ${oneCaption}`, CHT_TREE_MAP_CLUSTER, oneCaption])
];

const _getCrChartOptions = crGetRoute({
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
