import { bindTo } from '../storeApi';

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
