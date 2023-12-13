import { isUndef } from '../storeApi';
import {
  getProxy,
  getKey,
  isSetting
} from '../stores/settingStore';

const _assign = Object.assign;

const _addBoolOptionTo = (
  options,
  propName
) => {
  if (isUndef(options[propName])) {
    options[propName] = isSetting(propName)
  }
};

export const addSettingsTo = (
  options,
  confItem,
  itemProps
) => {
  const { loadId } = options;
  _assign(options, confItem, itemProps, {
    apiKey: getKey(loadId),
    proxy: getProxy(loadId)
  })
  _addBoolOptionTo(options, 'isDrawDeltaExtrems')
  _addBoolOptionTo(options, 'isNotZoomToMinMax')
}
