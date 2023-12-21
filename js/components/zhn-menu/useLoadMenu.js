"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const LOADING = 'a',
  LOADED = 'b',
  FAILED = 'c',
  _crAction = (type, menu) => ({
    type,
    menu
  }),
  initialState = {
    isLoaded: false,
    isLoading: false,
    menu: []
  };
const _reducer = (state, _ref) => {
  let {
    type,
    menu
  } = _ref;
  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case LOADED:
      return {
        menu,
        isLoading: false,
        isLoaded: true
      };
    case FAILED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
const useLoadMenu = (isShow, onLoadMenu, useMsBrowserLoad, browserType) => {
  const [{
      isLoading,
      isLoaded,
      menu
    }, dispatch] = (0, _uiApi.useReducer)(_reducer, initialState),
    _isRequireLoadMenu = !isLoaded && !isLoading && isShow;
  useMsBrowserLoad(msBrowserLoad => {
    if (msBrowserLoad && msBrowserLoad.browserType === browserType) {
      const {
        menuItems
      } = msBrowserLoad;
      if (menuItems) {
        dispatch(_crAction(LOADED, menuItems));
      } else {
        dispatch(_crAction(FAILED));
      }
    }
  });

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (_isRequireLoadMenu) {
      onLoadMenu();
      dispatch(_crAction(LOADING));
    }
  }, [_isRequireLoadMenu]);
  // onLoadMenu
  /*eslint-enable react-hooks/exhaustive-deps */

  return [isLoading, menu];
};
var _default = exports.default = useLoadMenu;
//# sourceMappingURL=useLoadMenu.js.map