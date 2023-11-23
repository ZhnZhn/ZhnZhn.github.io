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
  } = json
  , elMenu = crMenu(menu, items, browserType);

  addDialogPropsTo(items, df);
  setRouterDialog(browserType, items);
  setBrowserMenu(browserType, elMenu);
  return elMenu;
}

export default initBrowserMenu
