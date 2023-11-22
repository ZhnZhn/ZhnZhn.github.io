import BrowserConfig from '../../../constants/BrowserConfig';

import crMenu from './crMenu';
import addDialogPropsTo from './addDialogPropsTo';
import findItemSetValue from './findItem';

export const isWithItemCounter = (
  browserType
) => {
  const _config = BrowserConfig[browserType];
  return typeof _config === 'undefined'
    ? false
    : !_config.withoutItemCounter;
}

export const initBrowserMenu = (
  setBrowserMenu,
  setRouterDialog,
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
  setRouterDialog(browserType, items);
  setBrowserMenu(browserType, elMenu);
  return elMenu;
}

const _findItemSetValue = (
  appMenu,
  bT,
  cT
) => isWithItemCounter(bT)
  ? findItemSetValue(appMenu[bT], cT)
  : void 0;

const _fEditItem = (edit) => (
  value,
  appMenu,
  bT,
  cT
) => {
  const setValue = _findItemSetValue(appMenu, bT, cT);
  if (setValue) {
    edit(setValue, value)
  }
}

const _editIsOpen = (setValue, value) => {
  setValue(prev => ({
    ...prev,
    is: value
  }))
};
export const setIsOpen = _fEditItem(_editIsOpen)


const _editPlusCounter = (setValue, value) => {
  setValue(prev => ({
    value: prev.value + value,
    is: true
  }))
};
export const plusCounter = _fEditItem(_editPlusCounter)

const _editResetCounter = (setValue, value) => {
  setValue(prev => ({
    ...prev,
    value
  }))
};
export const resetCounter = _fEditItem(_editResetCounter)
  .bind(null, 0)
