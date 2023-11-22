import { bindTo } from '../storeApi';

import BrowserConfig from '../../constants/BrowserConfig';
import { BT_STOCKS_BY_SECTORS } from '../../constants/BrowserType';
import DataWL from '../../constants/DataWL';

import {
  setIsOpen,
  plusCounter,
  resetCounter
} from './browser/BrowserLogicFn';

const BROWSER_MENU = {};

const _setItemOpen = bindTo(setIsOpen, true)
, _setItemClose = bindTo(setIsOpen, false)
, _addCounter = bindTo(plusCounter, 1)
, _minusCounter = bindTo(plusCounter, -1);

export const getBrowserMenu = (
  browserType
) => BROWSER_MENU[browserType]
export const setBrowserMenu = (
  browserType,
  menu
) => {
  BROWSER_MENU[browserType] = menu
}

export const setMenuItemOpen = (cT, bT) => {
  _setItemOpen(BROWSER_MENU, bT, cT)
}

export const setMenuItemClose = (cT, bT) => {
  _setItemClose(BROWSER_MENU, bT, cT)
}

export const addMenuItemCounter = (cT, bT) => {
  _addCounter(BROWSER_MENU, bT, cT)
}

export const minusMenuItemCounter = (cT, bT) => {
  _minusCounter(BROWSER_MENU, bT, cT)
}

export const resetMenuItemCounter = (cT, bT) => {
  resetCounter(BROWSER_MENU, bT, cT)
}

const ROUTER_DIALOG = {
  WL: DataWL
};

export const setRouterDialog = (browserType, items) => {
  ROUTER_DIALOG[browserType] = items
}

const _getRouterDialog = (browserId) => ROUTER_DIALOG[browserId]
export const getSourceConfig = (browserId, sourceId) => {
  if (sourceId.indexOf(BT_STOCKS_BY_SECTORS) > 0){
    return BrowserConfig[browserId];
  }
  const _r = _getRouterDialog(browserId);
  return _r ? _r[sourceId] : void 0;
}
