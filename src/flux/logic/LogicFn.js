export { clearPrototypeOf } from '../../utils/clearPrototypeOf';

import {
  LT_Q,  
  LT_EU_STAT,
  LT_EIA,
  LT_WL
} from '../../constants/LoadType';

import LoadConfig from './LoadConfig';

const _isFn = fn => typeof fn === 'function';

const _crNdlKey = ({
  loadId,
  isLoadMeta,
  value,
  dataColumn,
  seriaType,
  viewKey
}) => viewKey || value;

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
    case LT_Q:
      return _itemKey || _crNdlKey(option);
    case LT_EU_STAT: case LT_EIA: case LT_WL:
      return _itemKey || id;
    default:
      return _crKey(option);
  }
}
