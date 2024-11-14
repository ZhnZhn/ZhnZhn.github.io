import {
  getByPropsFrom,
  getValue,
  crGetRoute
} from '../AdapterFn';
import {
  isCategory
} from '../CategoryFn';

const _getRefArea = (
  isCategory,
  items
) => isCategory ? "" : getValue(items[0]);

const _crItemId = (
  isCategory,
  items
) => `${_getRefArea(isCategory, items)}.Q.${getValue(items[1])}.IX`;

const _crItemIdHhi = (
  isCategory,
  items
) => `Q.${_getRefArea(isCategory, items)}.${getValue(items[1])}`;

const _crItemIdMdf = (
  isCategory,
  items
) => `${_getRefArea(isCategory, items)}.Q......${getValue(items[1])}`;
const _crItemIdNvr = (
  isCategory,
  items
) => `${_getRefArea(isCategory, items)}.Q.....${getValue(items[1])}.`;
const _crItemIdMvt = (
  isCategory,
  items
) => `${_getRefArea(isCategory, items)}.Q......`;
const _crItemIdCpi = (
  isCategory,
  items
) => `${_getRefArea(isCategory, items)}.M.${getValue(items[1])}.CPI.IX._T.N._Z`;
const _crItemIdEp = (
  isCategory,
  items
) => `${_getRefArea(isCategory, items)}..${getValue(items[1])}._T`

const _hmCrItemId = {
  mdf: _crItemIdMdf,
  nvr: _crItemIdNvr,
  mvt: _crItemIdMvt,
  cpi: _crItemIdCpi,
  hhi: _crItemIdHhi,
  ep: _crItemIdEp
}
, _getCrItemId = crGetRoute(_hmCrItemId, _crItemId);

export const crItemId = (
  option
) => _getCrItemId(option.dfFn)(isCategory(option), option.items)

export const getJsonData = (
  json
) => (json || {}).data || {}

export const getDataSeries = (
  data
) => getByPropsFrom(data, "dataSets", 0, "series") || {}

export const getRefAreaIndex = (
  option
) => option.dfFn === "hhi"
  ? 1
  : 0

export const getDataDimensions = (
  data
) => getByPropsFrom(data, "structures", 0, "dimensions")

export const crObservationPropName = (
  option
) => crItemId(option)
.split(".")
.reduce((pn, _) => pn + ":0", "")
.slice(1)
