import { joinBy } from '../AdapterFn';
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

export const getObsValue = element => element
  ? parseFloat(element.getAttribute("OBS_VALUE"))
  : null
