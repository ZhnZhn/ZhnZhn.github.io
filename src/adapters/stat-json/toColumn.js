import { crCategoryData } from '../JsonStatFn';

import {
  CHT_BAR,
  CHT_COLUMN,
  CHT_COLUMN_SET,
  CHT_BAR_SET,
  CHT_COLUMN_CLUSTER,
  CHT_BAR_CLUSTER
} from '../../constants/ChartType';

import crCategoryConfig from '../crCategoryConfig';

import {
  crTitle,
  crChartOption,
  toUpperCaseFirst
} from './fnAdapter';

const _assign = Object.assign;

const _crTitle = (
  dfTitle,
  option
) => dfTitle
  ? `${dfTitle}: All Items`
  : crTitle(option);

const _crSubtitle = (
  items,
  category
) => {
  const _arr = [];
  (items || []).forEach(item => {
    const { slice, caption } = item || {};
    if (slice && !slice[category] && caption) {
      _arr.push(toUpperCaseFirst(caption))
    }
  })
  return _arr.join(": ");
};

const _crConfig = (
  json,
  option
) => _assign(crCategoryConfig(
    _crTitle(option.dfTitle, option),
    _crSubtitle(option.items, option.dfC),
    option.seriaType,
    option.seriaColor,
    crCategoryData(json),
    option.isAlg
  ),
  crChartOption(option.time, option, json)
)
, _fCrConfig = (
  seriaType
) => (
  json,
  option
) => _crConfig(json, {
  ...option,
  seriaType
});

const routerColumnBarSet = {
  [CHT_COLUMN_SET]: _fCrConfig(CHT_COLUMN),
  [CHT_COLUMN_CLUSTER]: _fCrConfig(CHT_COLUMN_CLUSTER),
  [CHT_BAR_SET]: _fCrConfig(CHT_BAR),
  [CHT_BAR_CLUSTER]: _fCrConfig(CHT_BAR_CLUSTER)
};

export default routerColumnBarSet
