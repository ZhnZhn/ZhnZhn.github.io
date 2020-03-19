"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Browser = _interopRequireDefault(require("./Browser"));

var _BrowserCaption = _interopRequireDefault(require("./BrowserCaption"));

var _ToolbarButtonCircle = _interopRequireDefault(require("../dialogs/ToolbarButtonCircle"));

var _ShowHide = _interopRequireDefault(require("./ShowHide"));

var _WrapperInputSearch = _interopRequireDefault(require("../zhn-select/WrapperInputSearch"));

var _ScrollPane = _interopRequireDefault(require("./ScrollPane"));

var _SpinnerLoading = _interopRequireDefault(require("./SpinnerLoading"));

var _MenuListType = _interopRequireDefault(require("./MenuListType2"));

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
  WRAPPER_SEARCH: {
    width: '100%',
    paddingBottom: 8,
    paddingRight: 24
  },
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    width: 32,
    height: 32,
    margin: '0 auto',
    marginTop: 32,
    textAlign: 'middle'
  }
};

var MenuBrowserDynamic2 =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuBrowserDynamic2, _Component);

  function MenuBrowserDynamic2(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._loadMenu = function () {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          caption = _this$props.caption,
          sourceMenuUrl = _this$props.sourceMenuUrl,
          onLoadMenu = _this$props.onLoadMenu;
      onLoadMenu({
        browserType: browserType,
        caption: caption,
        sourceMenuUrl: sourceMenuUrl
      });
    };

    _this._onStore = function (actionType, data) {
      var _this$props2 = _this.props,
          browserType = _this$props2.browserType,
          showAction = _this$props2.showAction,
          loadCompletedAction = _this$props2.loadCompletedAction;

      if (actionType === showAction && data === browserType) {
        _this._handleShow();
      } else if (actionType === loadCompletedAction && data.browserType === browserType) {
        _this.setState({
          menuItems: data.json,
          isLoaded: true
        });
      }
    };

    _this._handleHide = function () {
      _this.setState({
        isShow: false
      });
    };

    _this._handleShow = function () {
      _this.setState({
        isShow: true
      });
    };

    _this._handleClickInfo = function () {
      var _this$props3 = _this.props,
          descrUrl = _this$props3.descrUrl,
          onClickInfo = _this$props3.onClickInfo;
      onClickInfo({
        descrUrl: descrUrl
      });
    };

    _this._handleClickSearch = function () {
      _this.setState(function (_ref) {
        var isShowSearch = _ref.isShowSearch;

        var _ref2 = isShowSearch ? [false, CL.BROWSER] : [true, CL.BROWSER_WITH_SEARCH],
            is = _ref2[0],
            scrollClass = _ref2[1];

        return {
          isShowSearch: is,
          scrollClass: scrollClass
        };
      });
    };

    _this._handleClickItem = function (item) {
      var _this$props4 = _this.props,
          modalDialogType = _this$props4.modalDialogType,
          browserType = _this$props4.browserType,
          chartContainerType = _this$props4.chartContainerType,
          onShowLoadDialog = _this$props4.onShowLoadDialog,
          onShowContainer = _this$props4.onShowContainer;
      onShowLoadDialog(modalDialogType, {
        item: item,
        browserType: browserType,
        chartContainerType: chartContainerType,
        onShow: onShowContainer
      });
    };

    var isInitShow = props.isInitShow;
    _this.toolbarButtons = [{
      caption: 'S',
      title: 'Click to toggle input search',
      onClick: _this._handleClickSearch.bind((0, _assertThisInitialized2["default"])(_this))
    }, {
      caption: 'A',
      title: 'About Datasources',
      onClick: _this._handleClickInfo.bind((0, _assertThisInitialized2["default"])(_this))
    }];
    _this.state = {
      isShow: !!isInitShow,
      isShowSearch: false,
      scrollClass: CL.BROWSER,
      isLoaded: false,
      menuItems: []
    };
    return _this;
  }

  var _proto = MenuBrowserDynamic2.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);

    this._loadMenu();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var _this$state = this.state,
        isLoaded = _this$state.isLoaded,
        isShow = _this$state.isShow;

    if (!isLoaded && isShow) {
      this._loadMenu();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        caption = _this$props5.caption,
        children = _this$props5.children,
        ItemOptionComp = _this$props5.ItemOptionComp,
        ItemComp = _this$props5.ItemComp,
        _this$state2 = this.state,
        menuItems = _this$state2.menuItems,
        isShow = _this$state2.isShow,
        isShowSearch = _this$state2.isShowSearch,
        scrollClass = _this$state2.scrollClass,
        _isMenuEmpty = menuItems.length === 0;

    return _react["default"].createElement(_Browser["default"], {
      isShow: isShow,
      style: STYLE.BROWSER
    }, _react["default"].createElement(_BrowserCaption["default"], {
      caption: caption,
      onClose: this._handleHide
    }), _react["default"].createElement(_ToolbarButtonCircle["default"], {
      buttons: this.toolbarButtons
    }), !_isMenuEmpty && _react["default"].createElement(_ShowHide["default"], {
      isShow: isShowSearch
    }, _react["default"].createElement(_WrapperInputSearch["default"], {
      style: STYLE.WRAPPER_SEARCH,
      placeholder: SEARCH_PLACEHOLDER,
      data: menuItems,
      ItemOptionComp: ItemOptionComp,
      onSelect: this._handleClickItem
    })), _react["default"].createElement(_ScrollPane["default"], {
      className: scrollClass
    }, _isMenuEmpty && _react["default"].createElement(_SpinnerLoading["default"], {
      style: STYLE.SPINNER_LOADING
    }), _react["default"].createElement(_MenuListType["default"], {
      model: menuItems,
      ItemComp: ItemComp,
      itemClassName: CL.ROW_ITEM,
      onClickItem: this._handleClickItem
    }), children));
  };

  return MenuBrowserDynamic2;
}(_react.Component);

var _default = MenuBrowserDynamic2;
exports["default"] = _default;
//# sourceMappingURL=MenuBrowserDynamic2.js.map