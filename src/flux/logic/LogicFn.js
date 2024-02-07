export { crRouter } from '../../utils/crRouter';

import {
  LT_Q,
  LT_QCT,
  LT_EU_STAT,
  LT_EIA,
  LT_WL
} from '../../constants/LoadType';
import { CHT_AREA } from '../../constants/ChartType';

import LoadConfig from './LoadConfig';

const _isFn = fn => typeof fn === 'function';

const _crNdlKey = ({
  loadId,
  isLoadMeta,
  value,
  dataColumn,
  seriaType,
  viewKey
}) => loadId === LT_QCT && !isLoadMeta
  ? seriaType === CHT_AREA
      ? `${value}_${CHT_AREA}_${dataColumn}`
      : `${value}_${seriaType}`
  : viewKey || value;

const _crKey = (option) => {
  const {
    loadId,
    value,
    _itemKey
  } = option
  , loadConfig = LoadConfig[loadId] || {}
  , { crKey } = loadConfig;
  return _isFn(crKey)
    ? crKey(option)
    : _itemKey || value || 'key';
};

export const crKeyForConfig = (option) => {
  const { loadId, _itemKey, id } = option;
  switch (loadId) {
    case LT_Q: case LT_QCT:
      return _itemKey || _crNdlKey(option);
    case LT_EU_STAT: case LT_EIA: case LT_WL:
      return _itemKey || id;
    default:
      return _crKey(option);
  }
}
