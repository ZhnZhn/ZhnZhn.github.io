import toPlural from '../../utils/toPlural';
import { isInArrStr } from '../../utils/arrFn';
import { CIT_EUROSTAT_MAP } from '../../constants/CompItemType';
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
  CHT_TREE_MAP_2,
  CHT_TREE_MAP_2_CLUSTER,

  CHT_MAP,
  CHT_DOT_SET
} from '../../constants/ChartType';

import { TYPE_T3AB } from './ChartOptionsTypes';

const _isArr = Array.isArray
, BLANK_CAPTION = ''

, CATEGORY_TYPES = [
    CHT_MAP,
    CHT_COLUMN_SET, CHT_COLUMN_CLUSTER,
    CHT_BAR_SET, CHT_BAR_CLUSTER, CHT_BAR_WITH_LABELS,
    CHT_DOT_SET,
    CHT_TREE_MAP, CHT_TREE_MAP_CLUSTER,
    CHT_TREE_MAP_2, CHT_TREE_MAP_2_CLUSTER
]

, SPLINE_CONFIG = ['Spline', CHT_SPLINE]
, LINE_CONFIG = ['Line', CHT_LINE]
, AREA_CONFIG = ['Area', CHT_AREA]
, COLUMN_CONFIG = ['Column', CHT_COLUMN]
, YEARLY_BY_MONTH_CONFIG = ['Yearly by Months' , CHT_AREA_YEARLY];

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
  id: configArr[4]
});
const _crItems = (arr) => arr
  .filter(Boolean)
  .map(_crItem);

const _isMonthly = (
  mapFrequency
) => !mapFrequency || mapFrequency === 'M';

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
  const oneCaption = toPlural(captions[0]) || 'Dim';
  return _crDF3(oneCaption, mapFrequency)
    .concat(_crItems([
       [`Map: By ${oneCaption}` , CHT_MAP, void 0, CIT_EUROSTAT_MAP]
    ]));
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
  _crItem(_crDfConfig(SPLINE_CONFIG)),
  _crYearlyByMonthItem(mapFrequency),
  ..._crColumBarClusterItems(oneCaption)
];

const _crTreeMapItem = (
  caption,
  id
) => _crItem([`TreeMap: By ${caption}`, CHT_TREE_MAP, caption, void 0, id]);

const _crT3A = ([oneCaption]) => [
  ..._crT3([oneCaption]),
  _crTreeMapItem(oneCaption),
  _crItem([`TreeMap: By ${oneCaption}: Cluster`, CHT_TREE_MAP_CLUSTER, oneCaption])
];

const _crT3AB = ([oneCaption, twoCaption]) => [
  ..._crT3([oneCaption]),
  _crTreeMapItem(twoCaption, TYPE_T3AB)
];

const _crT3A2 = ([oneCaption]) => [
  ..._crT3A([oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}: Depth 2`, CHT_TREE_MAP_2, oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}: Depth 2: Cluster`, CHT_TREE_MAP_2_CLUSTER, oneCaption])
];

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
  [TYPE_T3AB]: _crT3AB,
  t3c: _crT3C,
  t3c2: _crT3C2,
  t3ca: _crT3CA,
  df3: _crDF3
};

const _crCaptions = ({
  configs,
  selectProps,
  oneCaption=BLANK_CAPTION,
  twoCaption=BLANK_CAPTION
}) => {
  const _arr = configs || selectProps;
  return _isArr(_arr)
    ? _arr.map(item => item.caption || BLANK_CAPTION)
    : [ oneCaption, twoCaption ];
};

const _crChartOptionsImpl = (
  chartsType,
  captions,
  mapFrequency
) => (_r[chartsType] || _r.DF)(
  captions,
  mapFrequency
).filter(Boolean);

export const crDialogChartOptions = (
  dialogOption,
  { mapFrequency }={}
) => {
  const {
    chartsType,
    mapFrequency:mF,
    dfProps
  } = dialogOption;
  return _crChartOptionsImpl(
    chartsType,
    _crCaptions(dialogOption),
    mapFrequency || mF || (dfProps || {}).mapFrequency
  );
}

export const crChartOptions = (
  selectProps,
  chartsType,
  mapFrequency
) => _crChartOptionsImpl(
  chartsType,
  _crCaptions({ selectProps }),
  mapFrequency
)

const _isCategory = isInArrStr(CATEGORY_TYPES);
export const isCategoryItem = (
  chartItem
) => !!chartItem && _isCategory(chartItem.value)
