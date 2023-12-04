import { fetchJson } from '../../utils/fnFetch';
import onCatch from '../logic/onCatch';

import {
  bindTo,
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
  setRouterDialog,
  getBrowserMenu
} from './browserLogic';

import { crAsyncBrowser } from '../logic/Factory';
import BrowserConfig from '../../constants/BrowserConfig';
import {
  BT_NDL,
  BT_EUROSTAT,
  BT_WATCH_LIST
} from '../../constants/BrowserType';

import { loadModalDialogs } from '../../components/dialogs/RouterModalDialog';
import { loadDialogs } from '../logic/RouterDialog';

const [
  _crMsBrowserLoad,
  _selectMsBrowserLoad
] = fCrStoreSlice("msBrowserLoad")
, [
  _crMsBrowserShow,
  _selectMsBrowserShow
] = fCrStoreSlice("msBrowserShow")
, [
  _crMsInitBrowser,
  _selectMsInitBrowser
] = fCrStoreSlice("msInitBrowser")

const _crStore = () => ({
  ..._crMsBrowserLoad(),
  ..._crMsBrowserShow(),
  ..._crMsInitBrowser()
})
, _browserStore = createStoreWithSelector(_crStore)
, [_set] = getStoreApi(_browserStore);

export const useMsBrowserLoad = fCrUse(_browserStore, _selectMsBrowserLoad)
export const setMsBrowserLoaded = (
  browserType,
  menuItems
) => _set(_crMsBrowserLoad({ browserType, menuItems }))
export const setMsBrowserFailed = (
  browserType
) => _set(_crMsBrowserLoad({ browserType }))

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
  setMsBrowserLoaded(
    browserType,
    menuItems
  )
}
, _loadBrowserFailed = (option) => {
  const {
    alertItemId,
    caption,
    browserType
  } = option;
  option.alertItemId = alertItemId || caption
  showAlertDialog(option)
  setMsBrowserFailed(browserType)
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

export const useMsBrowserShow = fCrUse(_browserStore, _selectMsBrowserShow)
export const useMsInitBrowser = fCrUse(_browserStore, _selectMsInitBrowser)

const ERR_LOAD = "Failed to load browser."
, ERR_FOUND = "Browser hasn't found."
, ERR_ITEM = "Browser"
, _crErr = (
  alertDescr,
  alertItemId
) => ({
  alertDescr,
  alertItemId
});

const _showBrowserFailed = (option) => {
  showAlertDialog(option)
}
, _initBrowser = (elBrowser, config) => {
  const { browserType } = config;
  if (!getBrowserMenu(browserType)) {
    setBrowserMenu(browserType, []);
    _set(_crMsInitBrowser({ elBrowser }))
  }
};

export const showBrowser = (option={}) => {
  const _option = typeof option === 'string'
    ? { browserType: option }
    : option
  , { browserType:bT } = _option
  , config = BrowserConfig[bT];
  if (bT && config) {
    if (getBrowserMenu(bT)) {
      _set(_crMsBrowserShow({
        browserType: _option.browserType
      }))
    } else {
      Promise.all([
        loadModalDialogs(bT),
        loadDialogs(bT)
      ])
      .then(() => crAsyncBrowser(config))
      .then(elBrowser => {
        _initBrowser(elBrowser, config)
      })
      .catch(() => {
        _showBrowserFailed({
          ..._option,
          ..._crErr(ERR_LOAD, config.caption)
        })
      })
    }
  } else {
    _showBrowserFailed({
      ..._option,
      ..._crErr(ERR_FOUND, ERR_ITEM)
    })
  }
}

export const showNdl = bindTo(showBrowser, BT_NDL)
export const showEurostat = bindTo(showBrowser, BT_EUROSTAT)
export const showWatch = bindTo(showBrowser, BT_WATCH_LIST)
