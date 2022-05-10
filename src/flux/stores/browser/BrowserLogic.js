import BrowserConfig from '../../../constants/BrowserConfig';

import crMenu from './crMenu';
import addDialogPropsTo from './addDialogPropsTo';
import findItem from './findItem';

export const isWithItemCounter = (
  browserType
) => {
  const _config = BrowserConfig[browserType];
  return typeof _config === 'undefined'
    ? false
    : !_config.withoutItemCounter;
}

export const initBrowserMenu = (
  slice,
  option
) => {
  const { json, browserType } = option
  , { menu, items, df } = json
  , elMenu = crMenu(menu, items, browserType);

  addDialogPropsTo(items, df);
  slice.routeDialog[browserType] = items;
  slice.browserMenu[browserType] = elMenu;
  return elMenu;
}

export const setIsOpen = (
  value,
  appMenu,
  bT,
  cT
) => {
  if (isWithItemCounter(bT)) {
    const item = findItem(appMenu[bT], cT);
    if (item) {
      item.isOpen = value;
    }
  }
}

const _findItemCounter = (
  appMenu,
  bT,
  cT
) => isWithItemCounter(bT)
  ? findItem(appMenu[bT], cT)
  : void 0;

export const plusCounter = (
  value,
  appMenu,
  bT,
  cT
) => {
  const item = _findItemCounter(appMenu, bT, cT);
  if (item){
    item.counter += value;
    item.isOpen = true;
  }
}

export const resetCounter = (
  appMenu,
  bT,
  cT
) => {
  const item = _findItemCounter(appMenu, bT, cT);
  if (item) {
    item.counter = 0
  }
}
