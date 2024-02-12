"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useHasBeenOpen = _interopRequireDefault(require("../hooks/useHasBeenOpen"));
const useLoadMenu = (isShow, onLoadMenu, useMsBrowserLoad, browserType) => {
  const [state, setState] = (0, _uiApi.useState)([]),
    [isLoading, menu] = state,
    _isRequireLoadMenu = (0, _useHasBeenOpen.default)(isShow) && !menu && !isLoading;
  useMsBrowserLoad(msBrowserLoad => {
    if (msBrowserLoad && msBrowserLoad.browserType === browserType) {
      const {
        menuItems
      } = msBrowserLoad;
      setState(menuItems ? [false, menuItems] : []);
    }
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (_isRequireLoadMenu) {
      onLoadMenu();
      setState([true]);
    }
  }, [_isRequireLoadMenu]);
  // onLoadMenu
  /*eslint-enable react-hooks/exhaustive-deps */

  return state;
};
var _default = exports.default = useLoadMenu;
//# sourceMappingURL=useLoadMenu.js.map