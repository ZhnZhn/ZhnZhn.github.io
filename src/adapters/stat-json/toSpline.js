import {
  CHT_AREA,
  CHT_SPLINE,
  CHT_COLUMN,
  CHT_AREA_YEARLY
} from '../../constants/ChartType';

import crConfigType1 from '../../charts/crConfigType1';

import {
  getDatasetLabel,
  crSplineData
} from '../JsonStatFn';

import { crConfOption } from './fnAdapter';
import crYearlyConfig from './toYearly';

const _isReverse = data => data.length > 2
  && data[0][0] > data[1][0];
const _checkTimeOrder = data => _isReverse(data)
  ? data.reverse()
  : data;

const _isPerJanuary = (label) => (label || '')
  .indexOf('per 1 January') !== -1;

const _crData = (
  json
) => _checkTimeOrder(crSplineData(
  json,
  _isPerJanuary(getDatasetLabel(json))
));

const _crSplineConfig = (
  json,
  option
) => {
  const data = _crData(json)
  , confOption = crConfOption(option, json);

  return crConfigType1({
    option,
    data,
    confOption
  });
};

const routerSplineConfig = {
  DF: _crSplineConfig,
  [CHT_AREA]: _crSplineConfig,
  [CHT_SPLINE]: _crSplineConfig,
  [CHT_COLUMN]: _crSplineConfig,
  [CHT_AREA_YEARLY]: crYearlyConfig
};

export default routerSplineConfig
