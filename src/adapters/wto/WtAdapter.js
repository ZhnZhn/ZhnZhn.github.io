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

const MILLION_US_DOLLAR = "Million US dollar";

const crTitle = (
  option
) => {
  const {
    items,
    dfT
   } = option
  , _reporting = getCaption(items[0])
  , _product = getCaption(items[1]);
  return {
    title: joinBy(": ", _reporting, dfT),
    subtitle: joinBy(": ", _product, MILLION_US_DOLLAR)
  };
};

const trOption = (
  option,
  json
) => {
   assign(option, crTitle(option))
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
) => json.Dataset.reduce((data, item) => {
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

const WtAdapter = crAdapterType1({
  crData,
  trOption
});

export default WtAdapter
