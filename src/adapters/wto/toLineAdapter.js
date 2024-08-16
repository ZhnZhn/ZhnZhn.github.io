import {
  isNumber,
  isStr,
  assign,
  getCaption,
  joinBy,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import crAdapterType1 from '../crAdapterType1';
import { getDataset } from './fnAdapter';

const crTitle = (
  option,
  json
) => {
  const {
    items,
    dfT
   } = option
  , _reporting = getCaption(items[0])
  , _product = getCaption(items[1])
  , item = getDataset(json)[0] || {};
  return {
    title: joinBy(": ", _reporting, dfT),
    subtitle: joinBy(": ", _product, item.Unit)
  };
};

const trOption = (
  option,
  json
) => {
   assign(option, crTitle(option, json))
}

const _getPeriodCode = (
  periodCode
) => periodCode === "A"
  ? ""
  : isStr(periodCode)
      ? "-" + periodCode.replace("M", "")
      : "-NN";

const crData = (
  json
) => getDataset(json).reduce((data, item) => {
  const {
    Value,
    Year
  } = item;
  if (isNumber(Value) && isNumber(Year)) {
    data.push([
      ymdToUTC(''+ Year + _getPeriodCode(item.PeriodCode)),
      Value
    ])
  }
  return data;
}, []).sort(compareByDate);

const toLineAdapter = crAdapterType1({
  crData,
  trOption
});

export default toLineAdapter
