"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crMenu = _interopRequireDefault(require("./crMenu"));
var _addDialogPropsTo = _interopRequireDefault(require("./addDialogPropsTo"));
const initBrowserMenu = (setBrowserMenu, setRouterDialog, option) => {
  const {
      json,
      browserType
    } = option,
    {
      menu,
      items,
      df
    } = json,
    elMenu = (0, _crMenu.default)(menu, items, browserType);
  (0, _addDialogPropsTo.default)(items, df);
  setRouterDialog(browserType, items);
  setBrowserMenu(browserType, elMenu);
  return elMenu;
};
var _default = exports.default = initBrowserMenu;
//# sourceMappingURL=initBrowserMenu.js.map