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
  const {
    json,
    browserType
  } = option
  , {
    menu,
    items,
    df
  } = json
  , elMenu = crMenu(menu, items, browserType);

  addDialogPropsTo(items, df);
  slice.routeDialog[browserType] = items;
  slice.browserMenu[browserType] = elMenu;
  return elMenu;
}

const _findItemCounter = (
  appMenu,
  bT,
  cT
) => isWithItemCounter(bT)
  ? findItem(appMenu[bT], cT)
  : void 0;

const _fEditItem = (edit) => (
  value,
  appMenu,
  bT,
  cT
) => {
  const item = _findItemCounter(appMenu, bT, cT);
  if (item) {
    edit(item, value)
  }
}

const _editIsOpen = (item, value) => {
  item.isOpen = value
};
export const setIsOpen = _fEditItem(_editIsOpen)


const _editPlusCounter = (item, value) => {
  item.counter += value;
  item.isOpen = true;
};
export const plusCounter = _fEditItem(_editPlusCounter)

const _editResetCounter = (item, value) => {
  item.counter = value
};
export const resetCounter = _fEditItem(_editResetCounter)
  .bind(null, 0)
