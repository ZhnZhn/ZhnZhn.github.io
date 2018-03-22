'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Browser = require('./Browser');

var _Browser2 = _interopRequireDefault(_Browser);

var _BrowserCaption = require('./BrowserCaption');

var _BrowserCaption2 = _interopRequireDefault(_BrowserCaption);

var _ToolbarButtonCircle = require('../dialogs/ToolbarButtonCircle');

var _ToolbarButtonCircle2 = _interopRequireDefault(_ToolbarButtonCircle);

var _ShowHide = require('./ShowHide');

var _ShowHide2 = _interopRequireDefault(_ShowHide);

var _WrapperInputSearch = require('../zhn-select/WrapperInputSearch');

var _WrapperInputSearch2 = _interopRequireDefault(_WrapperInputSearch);

var _ScrollPane = require('./ScrollPane');

var _ScrollPane2 = _interopRequireDefault(_ScrollPane);

var _SpinnerLoading = require('./SpinnerLoading');

var _SpinnerLoading2 = _interopRequireDefault(_SpinnerLoading);

var _MenuListType = require('./MenuListType2');

var _MenuListType2 = _interopRequireDefault(_MenuListType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SEARCH_PLACEHOLDER = "Search By Symbol Or Name";

var CL = {
  BROWSER: "scroll-browser-by",
  BROWSER_WITH_SEARCH: "scroll-browser-by--search",
  ROW_ITEM: 'row__type2-topic not-selected'
};

var STYLE = {
  BROWSER: {
    paddingRight: '0',
    paddingBottom: '4px',
    minWidth: '300px'
  },
  WRAPPER_SEARCH: {
    paddingBottom: '8px',
    width: '100%',
    paddingRight: '24px'
  },
  SPINNER_LOADING: {
    position: 'relative',
    display: 'block',
    textAlign: 'middle',
    margin: '0 auto',
    marginTop: '32px',
    width: '32px',
    height: '32px'
  }
};

var MenuBrowserDynamic2 = function (_Component) {
  (0, _inherits3.default)(MenuBrowserDynamic2, _Component);

  function MenuBrowserDynamic2(props) {
    (0, _classCallCheck3.default)(this, MenuBrowserDynamic2);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuBrowserDynamic2.__proto__ || Object.getPrototypeOf(MenuBrowserDynamic2)).call(this));

    _this._loadMenu = function () {
      var _this$props = _this.props,
          browserType = _this$props.browserType,
          caption = _this$props.caption,
          sourceMenuUrl = _this$props.sourceMenuUrl,
          onLoadMenu = _this$props.onLoadMenu;

      onLoadMenu({ browserType: browserType, caption: caption, sourceMenuUrl: sourceMenuUrl });
    };

    _this._onStore = function (actionType, data) {
      var _this$props2 = _this.props,
          browserType = _this$props2.browserType,
          showAction = _this$props2.showAction,
          loadCompletedAction = _this$props2.loadCompletedAction;

      if (actionType === showAction && data === browserType) {
        _this._handleShow();
      } else if (actionType === loadCompletedAction && data.browserType === browserType) {
        _this.setState({ menuItems: data.json, isLoaded: true });
      }
    };

    _this._handleHide = function () {
      _this.setState({ isShow: false });
    };

    _this._handleShow = function () {
      _this.setState({ isShow: true });
    };

    _this._handleClickInfo = function () {
      var _this$props3 = _this.props,
          descrUrl = _this$props3.descrUrl,
          onClickInfo = _this$props3.onClickInfo;

      onClickInfo({ descrUrl: descrUrl });
    };

    _this._handleClickSearch = function () {
      if (_this.state.isShowSearch) {
        _this.setState({
          isShowSearch: false,
          scrollClass: CL.BROWSER
        });
      } else {
        _this.setState({
          isShowSearch: true,
          scrollClass: CL.BROWSER_WITH_SEARCH
        });
      }
    };

    _this._handleClickItem = function (item) {
      var _this$props4 = _this.props,
          modalDialogType = _this$props4.modalDialogType,
          browserType = _this$props4.browserType,
          chartContainerType = _this$props4.chartContainerType,
          onShowLoadDialog = _this$props4.onShowLoadDialog,
          onShowContainer = _this$props4.onShowContainer;


      onShowLoadDialog(modalDialogType, {
        item: item, browserType: browserType, chartContainerType: chartContainerType,
        onShow: onShowContainer
      });
    };

    var isInitShow = props.isInitShow;

    _this.toolbarButtons = [{ caption: 'I', onClick: _this._handleClickInfo.bind(_this) }, { caption: 'S', onClick: _this._handleClickSearch.bind(_this) }];
    _this.state = {
      isShow: isInitShow ? true : false,
      isShowSearch: false,
      scrollClass: CL.BROWSER,
      isLoaded: false,
      menuItems: []
    };
    return _this;
  }

  (0, _createClass3.default)(MenuBrowserDynamic2, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
      this._loadMenu();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (!nextState.isLoaded && nextState.isShow) {
        this._loadMenu();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          caption = _props.caption,
          children = _props.children,
          ItemOptionComp = _props.ItemOptionComp,
          ItemComp = _props.ItemComp,
          _state = this.state,
          menuItems = _state.menuItems,
          isShow = _state.isShow,
          isShowSearch = _state.isShowSearch,
          scrollClass = _state.scrollClass,
          _wrapperSearch = menuItems.length !== 0 ? _react2.default.createElement(
        _ShowHide2.default,
        { isShow: isShowSearch },
        _react2.default.createElement(_WrapperInputSearch2.default, {
          style: STYLE.WRAPPER_SEARCH,
          placeholder: SEARCH_PLACEHOLDER,
          data: menuItems,
          ItemOptionComp: ItemOptionComp,
          onSelect: this._handleClickItem
        })
      ) : null,
          _spinnerLoading = menuItems.length === 0 ? _react2.default.createElement(_SpinnerLoading2.default, { style: STYLE.SPINNER_LOADING }) : null;

      return _react2.default.createElement(
        _Browser2.default,
        { isShow: isShow, style: STYLE.BROWSER },
        _react2.default.createElement(_BrowserCaption2.default, {
          caption: caption,
          onClose: this._handleHide
        }),
        _react2.default.createElement(_ToolbarButtonCircle2.default, {
          buttons: this.toolbarButtons
        }),
        _wrapperSearch,
        _react2.default.createElement(
          _ScrollPane2.default,
          { className: scrollClass },
          _spinnerLoading,
          _react2.default.createElement(_MenuListType2.default, {
            model: menuItems,
            ItemComp: ItemComp,
            itemClassName: CL.ROW_ITEM,
            onClickItem: this._handleClickItem
          }),
          children
        )
      );
    }
  }]);
  return MenuBrowserDynamic2;
}(_react.Component);

exports.default = MenuBrowserDynamic2;
//# sourceMappingURL=MenuBrowserDynamic2.js.map