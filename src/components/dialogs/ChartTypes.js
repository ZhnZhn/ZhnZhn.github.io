import toPlural from '../../utils/toPlural';
import { CIT_EUROSTAT_MAP } from '../../constants/Type';

const _isArr = Array.isArray;

const V = {
  A: 'AREA',
  A_Y: 'AREA_YEARLY',
  S: 'SPLINE',
  L: 'LINE',
  S_C: 'COLUMN',
  M: 'MAP',
  C: 'COLUMN_SET',
  C_C: 'COLUMN_CLUSTER' ,
  B: 'BAR_SET',
  B_C: 'BAR_CLUSTER',
  B_L: 'BAR_WITH_LABELS',
  D: 'DOT_SET',
  TM: 'TREE_MAP',
  TM_C: 'TREE_MAP_CLUSTER',
  TM_2: 'TREE_MAP_2',
  TM_2_C: 'TREE_MAP_2_CLUSTER'
};

const CATEGORY_TYPES = [
  V.M,
  V.C, V.C_C,
  V.B, V.B_C, V.B_L,
  V.D,
  V.TM, V.TM_C, V.TM_2, V.TM_2_C
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
  ['Default: Spline', V.S ],
  ['Line', V.L],
  _isMonthly(mapFrequency) && ['Yearly by Months', V.A_Y ],
  ['Area', V.A ],
  ['Column', V.S_C ],
  [`Bar: By ${oneCaption}`, V.B ],
  [`Bar+Labels: By ${oneCaption}`, V.B_L ],
  [`Column: By ${oneCaption}`, V.C ],
  [`Dots: By ${oneCaption}`, V.D ]
].filter(Boolean));

const _crDF = (captions, mapFrequency) => {
  const oneCaption = toPlural(captions[0]) || 'Dim';
  return _crDF3(oneCaption, mapFrequency)
    .concat(_crItems([
       [`Map: By ${oneCaption}` , V.M, void 0, CIT_EUROSTAT_MAP ]
    ]));
};

const _crT1 = () => [
  _crItem(['Default: Spline', V.S ]),
  _crItem(['Line', V.L]),
  _crItem(['Area', V.A]),
];
const _crT1A = () => [
  _crItem(['Default: Area', V.A]),
  _crItem(['Line', V.L]),
  _crItem(['Spline', V.S ])
];


const _crT2 = () => [
  ..._crT1(),
  _crItem(['Column', V.S_C ]),
];

const _crYearlyByMonthItem = mapFrequency =>
  _isMonthly(mapFrequency) && _crItem(['Yearly by Months' , V.A_Y ]);

const _crT2A = (_, mapFrequency) => [
  ..._crT2(),
  _crYearlyByMonthItem(mapFrequency)
].filter(Boolean);

const _crT3All = (oneCaption) => _crItems([
  [`Column: By ${oneCaption}`, V.C, oneCaption],
  [`Column: By ${oneCaption}: Cluster`, V.C_C, oneCaption],
  [`Bar: By ${oneCaption}`, V.B, oneCaption],
  [`Bar: By ${oneCaption}: Cluster`, V.B_C, oneCaption]
]);

const _crT2AE = (_, mapFrequency) => [
  ..._crT2A(_, mapFrequency),
  ..._crT3All("Dim")
];

const _crT3 = ([oneCaption]) => [
  _crItem(['Default: Spline', V.S]),
  ..._crT3All(oneCaption)
];

const _crT3B = ([oneCaption], mapFrequency) => [
  _crItem(['Default: Spline', V.S]),
  _crYearlyByMonthItem(mapFrequency),
  ..._crT3All(oneCaption)
].filter(Boolean);


const _crT3A = ([oneCaption]) => [
  ..._crT3([oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}`, V.TM, oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}: Cluster`, V.TM_C, oneCaption])
];

const _crT3A2 = ([oneCaption]) => [
  ..._crT3A([oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}: Depth 2`, V.TM_2, oneCaption]),
  _crItem([`TreeMap: By ${oneCaption}: Depth 2: Cluster`, V.TM_2_C, oneCaption])
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

const ChartTypes = {
  crOptions(dialogOption, { mapFrequency }={}){
     const { chartsType, mapFrequency:mF, dfProps={} } = dialogOption
     , _mapFrequency = mapFrequency
          || mF || dfProps.mapFrequency
     , _captions = _crCaptions(dialogOption)
     , _crOptions = _r[chartsType] || _r.DF;
     return _crOptions(_captions, _mapFrequency);
  },

  crChartOptions(selectProps, chartsType, mapFrequency) {
    const _captions = _crCaptions({ selectProps })
    , _crOptions = _r[chartsType] || _r.DF;
    return _crOptions(_captions, mapFrequency);
  },

  isCategory(chartItem) {
    if (!chartItem) {
      return false;
    }
    return CATEGORY_TYPES
      .indexOf(chartItem.value) !== -1;
  }

};

export default ChartTypes
