import toPlural from '../../utils/toPlural';
import { CIT_EUROSTAT_MAP } from '../../constants/CompItemType';

const _isArr = Array.isArray
, AREA = 'AREA'
, AREA_YEARLY = 'AREA_YEARLY'
, SPLINE = 'SPLINE'
, LINE = 'LINE'
, COLUMN = 'COLUMN'
, MAP = 'MAP'
, COLUMN_SET = 'COLUMN_SET'
, COLUMN_CLUSTER = 'COLUMN_CLUSTER'
, BAR_SET = 'BAR_SET'
, BAR_CLUSTER = 'BAR_CLUSTER'
, BAR_WITH_LABELS = 'BAR_WITH_LABELS'
, DOT_SET = 'DOT_SET'
, TREE_MAP = 'TREE_MAP'
, TREE_MAP_CLUSTER = 'TREE_MAP_CLUSTER'
, TREE_MAP_2 = 'TREE_MAP_2'
, TREE_MAP_2_CLUSTER = 'TREE_MAP_2_CLUSTER';

const CATEGORY_TYPES = [
  MAP,
  COLUMN_SET, COLUMN_CLUSTER,
  BAR_SET, BAR_CLUSTER, BAR_WITH_LABELS,
  DOT_SET,
  TREE_MAP, TREE_MAP_CLUSTER, TREE_MAP_2, TREE_MAP_2_CLUSTER
];

const EMPTY = '';

const _crItem = confArr => ({
  caption: confArr[0],
  value: confArr[1],
  dim: confArr[2],
  compType: confArr[3]
});
const _crItems = arr => arr.map(_crItem);

const _isMonthly = mapFrequency => !mapFrequency
  || mapFrequency === 'M';

const _crDF3 = (oneCaption, mapFrequency) => _crItems([
  ['Default: Spline', SPLINE],
  ['Line', LINE],
  _isMonthly(mapFrequency) && ['Yearly by Months', AREA_YEARLY],
  ['Area', AREA],
  ['Column', COLUMN],
  [`Bar: By ${oneCaption}`, BAR_SET],
  [`Bar+Labels: By ${oneCaption}`, BAR_WITH_LABELS],
  [`Column: By ${oneCaption}`, COLUMN_SET],
  [`Dots: By ${oneCaption}`, DOT_SET]
].filter(Boolean));

const _crDF = (captions, mapFrequency) => {
  const oneCaption = toPlural(captions[0]) || 'Dim';
  return _crDF3(oneCaption, mapFrequency)
    .concat(_crItems([
       [`Map: By ${oneCaption}` , MAP, void 0, CIT_EUROSTAT_MAP]
    ]));
};

const _crT1 = () => [
  _crItem(['Default: Spline', SPLINE]),
  _crItem(['Line', LINE]),
  _crItem(['Area', AREA]),
];
const _crT1A = () => [
  _crItem(['Default: Area', AREA]),
  _crItem(['Line', LINE]),
  _crItem(['Spline', SPLINE])
];


const _crT2 = () => [
  ..._crT1(),
  _crItem(['Column', COLUMN]),
];

const _crYearlyByMonthItem = mapFrequency =>
  _isMonthly(mapFrequency) && _crItem(['Yearly by Months' , AREA_YEARLY]);

const _crT2A = (_, mapFrequency) => [
  ..._crT2(),
  _crYearlyByMonthItem(mapFrequency)
].filter(Boolean);

const _crT3All = (oneCaption) => _crItems([
  [`Column: By ${oneCaption}`, COLUMN_SET, oneCaption],
  [`Column: By ${oneCaption}: Cluster`, COLUMN_CLUSTER, oneCaption],
  [`Bar: By ${oneCaption}`, BAR_SET, oneCaption],
  [`Bar: By ${oneCaption}: Cluster`, BAR_CLUSTER, oneCaption]
]);

const _crT2AE = (_, mapFrequency) => [
  ..._crT2A(_, mapFrequency),
  ..._crT3All("Dim")
];

const _crT3 = ([oneCaption]) => [
  _crItem(['Default: Spline', SPLINE]),
  ..._crT3All(oneCaption)
];

const _crT3B = ([oneCaption], mapFrequency) => [
  _crItem(['Default: Spline', SPLINE]),
  _crYearlyByMonthItem(mapFrequency),
  ..._crT3All(oneCaption)
].filter(Boolean);


const _crT3A = ([oneCaption]) => [
  ..._crT3([oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}`, TREE_MAP, oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}: Cluster`, TREE_MAP_CLUSTER, oneCaption])
];

const _crT3A2 = ([oneCaption]) => [
  ..._crT3A([oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}: Depth 2`, TREE_MAP_2, oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}: Depth 2: Cluster`, TREE_MAP_2_CLUSTER, oneCaption])
];

const _r = {
  DF: _crDF,
  t1: _crT1,
  t1a: _crT1A,
  t2: _crT2,
  t2a: _crT2A,
  t2ae: _crT2AE,
  t3: _crT3,
  t3b: _crT3B,
  t3a: _crT3A,
  t3a2: _crT3A2,
  df3: _crDF3
};

const _crCaptions = ({
  configs,
  selectProps,
  oneCaption=EMPTY,
  twoCaption=EMPTY
}) => {
  const _arr = configs || selectProps;
  return _isArr(_arr)
    ? _arr.map(item => item.caption || EMPTY)
    : [ oneCaption, twoCaption ];
};


export const crDialogChartOptions = (
  dialogOption,
  { mapFrequency }={}
) => {
    const {
     chartsType,
     mapFrequency:mF,
     dfProps
    } = dialogOption
    , _mapFrequency = mapFrequency
        || mF || (dfProps || {}).mapFrequency
    , _captions = _crCaptions(dialogOption)
    , _crOptions = _r[chartsType] || _r.DF;
    return _crOptions(_captions, _mapFrequency);
}

export const crChartOptions = (
  selectProps,
  chartsType,
  mapFrequency
) => {
   const _captions = _crCaptions({ selectProps })
   , _crOptions = _r[chartsType] || _r.DF;
   return _crOptions(_captions, mapFrequency);
}

export const isCategoryItem = (chartItem) => {
  if (!chartItem) {
    return false;
  }
  return CATEGORY_TYPES
    .indexOf(chartItem.value) !== -1;
}
