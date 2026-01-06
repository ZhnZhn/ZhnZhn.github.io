import { isStr } from '../../utils/isTypeFn';
import { joinByColon } from '../../utils/arrFn';
import { getCaption } from '../../utils/itemFn';

import {
  assign,
  ymdToUTC
} from '../AdapterFn';
import { compareByDate } from '../compareByFn';
import {
  fCrDataType1,
  crAdapterType1
} from '../crAdapterType1';

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
    title: joinByColon(_reporting, dfT),
    subtitle: joinByColon(_product, item.Unit)
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

const _fCrItemTuple = () => item => [
  ymdToUTC(''+ item.Year + _getPeriodCode(item.PeriodCode)),
  item.Value
]
, _crData = fCrDataType1(getDataset, _fCrItemTuple)
, crData = json => _crData(json).sort(compareByDate);

const toLineAdapter = crAdapterType1({
  crData,
  trOption
});

export default toLineAdapter
