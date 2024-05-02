import crMenu from './crMenu';
import addDialogPropsTo from './addDialogPropsTo';

const initBrowserMenu = (
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
  } = json;

  addDialogPropsTo(items, df);
  setRouterDialog(browserType, items);
  const elMenu = crMenu(menu, items, browserType);
  setBrowserMenu(browserType, elMenu);
  return elMenu;
};

export default initBrowserMenu
