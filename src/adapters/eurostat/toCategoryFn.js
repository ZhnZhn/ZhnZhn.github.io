import compose from '../../utils/compose';
import pipe from '../../utils/pipe';

import {
  fAddCaption,
  fAddSeriaBy,
  fAdd,
  setBarConfigHeightIf,
  toConfig
} from '../../charts/configBuilderFn';
import { fTooltip } from '../../charts/Chart';
import { tooltipCategorySimple } from '../../charts/Tooltip';

import { getCaption } from '../AdapterFn';
import { fRoundByIf } from '../CategoryFn';

import {
  crDatasetInfo,
  crZhConfig
} from './EuroStatFn';
import FactoryChart from './FactoryChart';

const EU_COLOR = "#001489"
, EA_COLOR = "#cca300"
, NOT_EU_MEMBER_COLOR = '#8085e9'
, EU_MEMBER = [
    "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus",
    "Czechia", "Denmark", "Estonia", "Finland", "France",
    "Germany", "Greece", "Hungary", "Ireland", "Italy",
    "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
    "Poland", "Portugal", "Romania", "Slovakia", "Slovenia",
    "Spain", "Sweden"
  ];

const _fIsCode = (
  token
) => str => str.toLowerCase().indexOf(token) !== -1
, _isEaCaption = _fIsCode("euro area")
, _isEuMember = str => EU_MEMBER.indexOf(str) !== -1;

const _isEuCaption = _fIsCode("union")
const _isEuGeoEntity = str => _isEaCaption(str)
  || _isEuCaption(str)
  || _isEuMember(str)

const _getCategoryColor = (
  caption
) => _isEuCaption(caption)
  ? EU_COLOR
  : _isEaCaption(caption)
  ? EA_COLOR
  : _isEuMember(caption)
  ? void 0
  : NOT_EU_MEMBER_COLOR;

const _setColorToCategory = p => {
  const color = _getCategoryColor(p.c || "");
  if (color) {
    p.color = color
  }
  return p;
}

const _colorCategoriesAndRoundBy = (
  data,
  roundByCategoryValueIf
) => {
  const _colorAndRoundByIf = compose(
    roundByCategoryValueIf,
    _setColorToCategory
  );
  for (const p of data) {
    _colorAndRoundByIf(p)
  }
}

export const crCategoryConfigImpl = ({
  json,
  option,
  data,
  categories,
  min
}) => {
  const {
    title,
    subtitle,
    time
  } = option;

  _colorCategoriesAndRoundBy(
    data,
    fRoundByIf(option)
  )

  const config = pipe(
    FactoryChart.createConfig(option, categories),
    fAddCaption(title, subtitle),
    fAddSeriaBy(0, { data, name: time }),
    fAdd({
      info: crDatasetInfo(json),
      zhConfig: {
        ...crZhConfig(option),
        itemCaption: title || "EU",
        itemTime: time
      }
    }),
    setBarConfigHeightIf,
    toConfig
  );

  if (!option.isNotZoomToMinMax) {
    config.yAxis.min = min
  }

  return config;
}

export const crCategoryTooltip = () => fTooltip(
  tooltipCategorySimple
)

const FN_TRUE = () => true
, _isNotValueEqZero = value => value !== 0
, _crPredicate = (
  isPredicate,
  predicate
) => isPredicate
  ? predicate
  : FN_TRUE;

export const fIsAddToCategories = option => {
  const _isGeoEntity = _crPredicate(
    _isEuCaption(getCaption(option.items[0])),
    _isEuGeoEntity
  )
  , _isValue = _crPredicate(
    option.isFilterZero,
    _isNotValueEqZero
  );
  return (
    geoEntity,
    value
  ) => _isGeoEntity(geoEntity) && _isValue(value);
}
