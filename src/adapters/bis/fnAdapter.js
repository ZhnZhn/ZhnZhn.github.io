import {
  joinBy,
  crXmlDocument,
  ymdToUTC
} from '../AdapterFn';
import { isCategory } from '../CategoryFn';

export const crItemId = ({
  dfPrefix,
  items,
  seriaType
}) => joinBy('.',
  dfPrefix,
  isCategory(seriaType) ? '*' : items[0].v,
  items[1].v
)

export const getSeriesCollection = (
  str
) => crXmlDocument(str)
  .getElementsByTagName('Series') || []

export const getObsValue = element => element
  ? parseFloat(element.getAttribute("OBS_VALUE"))
  : null

export const getTimePeriod = element => element
  ? ymdToUTC(element.getAttribute("TIME_PERIOD"))
  : null
