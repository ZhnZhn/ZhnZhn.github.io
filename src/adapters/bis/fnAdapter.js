import {
  joinByDot
} from "../../utils/arrFn";

import {
  FN_IDENTITY,
  crGetRoute,
  getValue,
  crXmlDocument,
  ymdToUTC
} from "../AdapterFn";
import {
  isCategory
} from "../CategoryFn";

const _crCategoryToken = (
  seriaType,
  item
) => isCategory(seriaType)
  ? "*"
  : getValue(item)
, _crItemIdDf = ({
  dfPrefix,
  items,
  seriaType,
  dfSuffix
}) => joinByDot(
  dfPrefix,
  _crCategoryToken(seriaType, items[0]),
  getValue(items[1]),
  dfSuffix
)
, _crItemId312 = ({
  items,
  seriaType
}) => joinByDot(
  getValue(items[2]),
  _crCategoryToken(seriaType, items[0]),
  getValue(items[1])
)
, _crItemId21 = ({
  items,
  dfSuffix
}) => joinByDot(
  getValue(items[1]),
  getValue(items[0]),
  dfSuffix
)
, _getCrItemId = crGetRoute({
  s312: _crItemId312,
  s21: _crItemId21
}, _crItemIdDf);

export const crItemId = (
  option
) => _getCrItemId(option.dfFn)(option)

export const getSeriesCollection = (
  str
) => crXmlDocument(str)
  .getElementsByTagName("Series") || []

const _fGetAttribute = (
  propName,
  transformValue
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

export const getRefArea = _fGetAttribute(
  "REF_AREA",
  FN_IDENTITY
)
export const fCrCategoryName = ({
  dfCategory
}) => dfCategory
  ? _fGetAttribute(dfCategory)
  : getRefArea
