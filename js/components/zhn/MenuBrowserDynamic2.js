"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _use = _interopRequireDefault(require("../hooks/use"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _BrowserCaption = _interopRequireDefault(require("./BrowserCaption"));

var _ToolbarButtonCircle = _interopRequireDefault(require("../dialogs/ToolbarButtonCircle"));

var _ShowHide = _interopRequireDefault(require("./ShowHide"));

var _WrapperInputSearch = _interopRequireDefault(require("../zhn-select/WrapperInputSearch"));

var _ScrollPane = _interopRequireDefault(require("./ScrollPane"));

var _SpinnerLoading = _interopRequireDefault(require("./SpinnerLoading"));

var _MenuListType = _interopRequireDefault(require("./MenuListType2"));

var useBool = _use["default"].useBool,
    useToggle = _use["default"].useToggle,
    useListen = _use["default"].useListen;
var SEARCH_PLACEHOLDER = "Search By Symbol Or Name";
var CL = {
  BROWSER: "scroll-browser-by",
  BROWSER_WITH_SEARCH: "scroll-browser-by--search",
  ROW_ITEM: 'row__type2-topic not-selected'
};
var STYLE = {
  BROWSER: {
    paddingRight: 0,
    paddingBottom: 4,
    minWidth: 300
  },
  CAPTION: {
    top: 9
  },
  WRAPPER_SEARCH: {
    width: '100%',
    paddingBottom: 8,
    paddingRight: 24
  }
};

var _useToolbarButtons = function _useToolbarButtons(toggleSearch, onClickInfo, descrUrl) {
  /*eslint-disable react-hooks/exhaustive-deps */
  var _hClickInfo = (0, _react.useCallback)(function () {
    onClickInfo({
      descrUrl: descrUrl
    });
  }, []);

  return (0, _react.useMemo)(function () {
    return [{
      caption: 'S',
      title: 'Click to toggle input search',
      onClick: toggleSearch
    }, {
      caption: 'A',
      title: 'About Datasources',
      onClick: _hClickInfo
    }];
  }, [_hClickInfo]);
  /*eslint-enable react-hooks/exhaustive-deps */
};

var MenuBrowserDynamic2 = function MenuBrowserDynamic2(_ref) {
  var isInitShow = _ref.isInitShow,
      store = _ref.store,
      browserType = _ref.browserType,
      showAction = _ref.showAction,
      loadCompletedAction = _ref.loadCompletedAction,
      caption = _ref.caption,
      sourceMenuUrl = _ref.sourceMenuUrl,
      onLoadMenu = _ref.onLoadMenu,
      descrUrl = _ref.descrUrl,
      onClickInfo = _ref.onClickInfo,
      modalDialogType = _ref.modalDialogType,
      chartContainerType = _ref.chartContainerType,
      onShowLoadDialog = _ref.onShowLoadDialog,
      onShowContainer = _ref.onShowContainer,
      ItemOptionComp = _ref.ItemOptionComp,
      ItemComp = _ref.ItemComp,
      children = _ref.children;

  var _useBool = useBool(isInitShow),
      isShow = _useBool[0],
      show = _useBool[1],
      hide = _useBool[2],
      _useToggle = useToggle(),
      isShowSearch = _useToggle[0],
      toggleSearch = _useToggle[1],
      _useState = (0, _react.useState)({
    isLoaded: false,
    menuItems: []
  }),
      _useState$ = _useState[0],
      isLoaded = _useState$.isLoaded,
      menuItems = _useState$.menuItems,
      setMenuItems = _useState[1],
      _toolbarButtons = _useToolbarButtons(toggleSearch, onClickInfo, descrUrl),
      _hClickItem = (0, _react.useCallback)(function (item) {
    return onShowLoadDialog(modalDialogType, {
      item: item,
      browserType: browserType,
      chartContainerType: chartContainerType,
      onShow: onShowContainer
    });
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps */


  useListen(store, function (actionType, data) {
    if (actionType === showAction && data === browserType) {
      show();
    } else if (actionType === loadCompletedAction && data.browserType === browserType) {
      setMenuItems({
        menuItems: data.menuItems,
        isLoaded: true
      });
    }
  });
  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (!isLoaded && isShow) {
      onLoadMenu({
        browserType: browserType,
        caption: caption,
        sourceMenuUrl: sourceMenuUrl
      });
    }
  }, [isLoaded, isShow]);
  /*eslint-enable react-hooks/exhaustive-deps */

  var _isMenuEmpty = menuItems.length === 0,
      _scrollClass = isShowSearch ? CL.BROWSER_WITH_SEARCH : CL.BROWSER;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Browser["default"], {
    isShow: isShow,
    style: STYLE.BROWSER,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BrowserCaption["default"], {
      caption: caption,
      captionStyle: STYLE.CAPTION,
      onClose: hide
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToolbarButtonCircle["default"], {
      buttons: _toolbarButtons
    }), !_isMenuEmpty && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide["default"], {
      isShow: isShowSearch,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperInputSearch["default"], {
        style: STYLE.WRAPPER_SEARCH,
        placeholder: SEARCH_PLACEHOLDER,
        data: menuItems,
        ItemOptionComp: ItemOptionComp,
        onSelect: _hClickItem
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ScrollPane["default"], {
      className: _scrollClass,
      children: [_isMenuEmpty && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpinnerLoading["default"], {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_MenuListType["default"], {
        model: menuItems,
        ItemComp: ItemComp,
        itemClassName: CL.ROW_ITEM,
        onClickItem: _hClickItem
      }), children]
    })]
  });
};

var _default = MenuBrowserDynamic2;
exports["default"] = _default;
//# sourceMappingURL=MenuBrowserDynamic2.js.map