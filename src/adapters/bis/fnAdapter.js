import {
  joinBy,
  getValue,
  crXmlDocument,
  ymdToUTC
} from '../AdapterFn';
import {
  isCategory
} from '../CategoryFn';

const _crItemIdDf = ({
  dfPrefix,
  items,
  seriaType,
  dfSuffix
}) => joinBy('.',
  dfPrefix,
  isCategory(seriaType) ? '*' : getValue(items[0]),
  getValue(items[1]),
  dfSuffix
)

const _crItemId312 = ({
  items,
  seriaType
}) => joinBy('.',
  getValue(items[2]),
  isCategory(seriaType) ? '*' : getValue(items[0]),
  getValue(items[1])
);

const _hmCrItemId = {
  s312: _crItemId312
};

export const crItemId = (
  option
) => (_hmCrItemId[option.dfFn] || _crItemIdDf)(option)

export const getSeriesCollection = (
  str
) => crXmlDocument(str)
  .getElementsByTagName('Series') || []

const FN_IDENTITY = v => v;
const _fGetAttribute = (
  propName,
  transformValue=FN_IDENTITY
) => element => element
  ? transformValue(element.getAttribute(propName))
  : null;

export const getObsValue = _fGetAttribute(
  "OBS_VALUE",
  parseFloat
)

export const getTimePeriod = _fGetAttribute(
  "TIME_PERIOD",
  ymdToUTC
)

export const getRefArea = _fGetAttribute("REF_AREA")
export const fCrCategoryName = ({
  dfCategory
}) => dfCategory
  ? _fGetAttribute(dfCategory)
  : getRefArea
