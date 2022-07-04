export {
  ymdToUTC,
  valueMoving,
  roundBy
} from '../AdapterFn';

import { toDescr } from './fnDescr';

export const crChartId = ({
  value,
  rg=2,
  measure,
  tp,
  freq,
  period
}) => [value, rg, measure, tp, freq, period]
  .filter(Boolean)
  .join("_");

export const crInfo = (
  json,
  option
) => ({
  frequency: option.period || (option.freq === 'M'
    ? 'Monthly'
    : 'Annual'),
  description: toDescr(json, option)
});

export const crZhConfig = (
  option,
  { isLegend } = {}
) => {
  const {
    oneC,
    period,
    dataSource
  } = option
  , _id = crChartId(option);
  return {
    id: _id,
    key: _id,
    itemCaption: oneC,
    itemTime: period,
    legend: isLegend ? [] : void 0,
    isWithoutIndicator: true,
    dataSource
  };
}
