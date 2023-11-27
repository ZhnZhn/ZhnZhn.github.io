import { fetchJson } from '../../utils/fnFetch';
import onCatch from '../logic/onCatch';

import {
  createStoreWithSelector,
  fCrStoreSlice,
  fCrUse,
  getStoreApi
} from '../storeApi';

import { showAlertDialog } from './compStore';

import isWithItemCounter from './browser/isWithItemCounter';
import initBrowserMenu  from './browser/initBrowserMenu';

import {
  setBrowserMenu,
  setRouterDialog
} from './browserLogic';

const [
  _crMsBrowserLoad,
  _selectMsBrowserLoad
] = fCrStoreSlice()

const _crStore = () => ({
  ..._crMsBrowserLoad()
})
, _browserStore = createStoreWithSelector(_crStore)
, [_set] = getStoreApi(_browserStore);

export const useMsBrowserLoad = fCrUse(_browserStore, _selectMsBrowserLoad)

const _fetchSourceMenu = ({
  json,
  option,
  onCompleted
}) => {
  const { browserType } = option;
  onCompleted({ json, browserType });
}
, _loadBrowserCompleted = (option) => {
  const { json, browserType } = option
  , menuItems = isWithItemCounter(browserType)
      ? initBrowserMenu(setBrowserMenu, setRouterDialog, option)
      : json;
  _set(_crMsBrowserLoad({
    browserType,
    menuItems
  }))
}
, _loadBrowserFailed = (option) => {
  const {
    alertItemId,
    caption,
    browserType
  } = option;
  option.alertItemId = alertItemId || caption
  showAlertDialog(option)
  _set(_crMsBrowserLoad({ browserType }))
}

export const loadBrowser = (option) => {
  fetchJson({
    option,
    uri: option.sourceMenuUrl,
    onFetch: _fetchSourceMenu,
    onCompleted: _loadBrowserCompleted,
    onFailed: _loadBrowserFailed,
    onCatch
  })
}
