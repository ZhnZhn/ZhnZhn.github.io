"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _throttleOnce = _interopRequireDefault(require("../../utils/throttleOnce"));

var _factoryClickItem = _interopRequireDefault(require("./factoryClickItem"));

var _loadItems = _interopRequireDefault(require("./loadItems"));

var _Frame = _interopRequireDefault(require("./Frame"));

var _MenuList = _interopRequireDefault(require("./MenuList"));

var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));

var _PageList = _interopRequireDefault(require("./PageList"));

var S = {
  ROOT: {
    width: 300,
    overflow: 'hidden'
  },
  PAGES: {
    width: 1500,
    overflowX: 'hidden',
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',
    transition: 'all 750ms ease-out'
  },
  PAGE: {
    width: 300
  }
};

var _getTranslateX = function _getTranslateX(node) {
  var _prevStr = node.style.transform.substring(11).replace('px', '').replace(')', '');

  return parseInt(_prevStr, 10);
};

var MenuSlider = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(MenuSlider, _Component);

  function MenuSlider(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._loadItems = function () {
      var _this$props = _this.props,
          _this$props$dfProps = _this$props.dfProps,
          dfProps = _this$props$dfProps === void 0 ? {} : _this$props$dfProps,
          store = _this$props.store,
          lT = dfProps.lT,
          proxy = store.getProxy(lT);
      (0, _loadItems["default"])(dfProps.rootUrl, proxy).then(function (model) {
        if (Array.isArray(model)) {
          _this.setState({
            model: model,
            errMsg: void 0
          });
        } else {
          throw new Error('Response is not array');
        }
      })["catch"](function (err) {
        _this.setState({
          errMsg: err.message
        });
      });
    };

    _this.hPrevPage = function (pageNumber) {
      _this.setState(function (_ref) {
        var pageCurrent = _ref.pageCurrent;

        if (pageCurrent === 0 || pageCurrent !== pageNumber) {
          return null;
        }

        _this._direction = -1;
        return {
          pageCurrent: pageNumber - 1
        };
      });
    };

    _this._addPage = function (pages, id, title) {
      var _this$props2 = _this.props,
          dfProps = _this$props2.dfProps,
          store = _this$props2.store;
      pages.push( /*#__PURE__*/_react["default"].createElement(_Frame["default"], {
        key: id,
        id: id,
        style: S.PAGE,
        store: store,
        title: title,
        dfProps: dfProps,
        onClickPrev: _this.hPrevPage,
        onClickNext: _this.hNextPage,
        loadItems: _loadItems["default"],
        fOnClickItem: _factoryClickItem["default"]
      }));
    };

    _this.hNextPage = function (id, title, pageNumber) {
      _this.setState(function (_ref2) {
        var pageCurrent = _ref2.pageCurrent,
            pages = _ref2.pages;

        if (pageNumber !== pageCurrent) {
          return null;
        }

        if (pageNumber < pages.length) {
          if (pages[pageNumber] && pages[pageNumber].key !== id) {
            if (pageNumber > 0) {
              pages.splice(pageNumber);
            } else {
              pages = [];
            }

            _this._addPage(pages, id, title);
          }
        } else {
          _this._addPage(pages, id, title);
        }

        _this._direction = 1;
        return {
          pages: pages,
          pageCurrent: pageNumber + 1
        };
      });
    };

    _this._crTransform = function () {
      var dX = '0';

      if (_this._direction !== 0 && _this._menuNode) {
        var _prevInt = _getTranslateX(_this._menuNode);

        if (_this._direction === 1) {
          dX = _prevInt - 300;
        } else {
          dX = _prevInt + 300;
        }

        _this._direction = 0;
      } else if (_this._direction === 0 && _this._menuNode) {
        dX = _getTranslateX(_this._menuNode);
      }

      return {
        transform: "translateX(" + dX + "px)"
      };
    };

    _this._refMenu = function (n) {
      return _this._menuNode = n;
    };

    _this.focusFirst = function () {
      var _nodeItem = _this._refFirstItem.current;

      if (_nodeItem) {
        _nodeItem.focus();
      }
    };

    _this.hNextPage = (0, _throttleOnce["default"])(_this.hNextPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this.hPrevPage = (0, _throttleOnce["default"])(_this.hPrevPage.bind((0, _assertThisInitialized2["default"])(_this)));
    _this._direction = 0;
    _this._refFirstItem = /*#__PURE__*/_react["default"].createRef();

    _this._fOnClickItem = function (_ref3) {
      var id = _ref3.id,
          text = _ref3.text;
      return _this.hNextPage.bind(null, id, text, 0);
    };

    _this.state = {
      model: [],
      pageCurrent: 0,
      pages: []
    };
    return _this;
  }

  var _proto = MenuSlider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._loadItems();
  };

  _proto.render = function render() {
    var _this$state = this.state,
        model = _this$state.model,
        errMsg = _this$state.errMsg,
        pages = _this$state.pages,
        pageCurrent = _this$state.pageCurrent;

    var _transform = this._crTransform(),
        _pagesStyle = (0, _extends2["default"])({}, S.PAGES, _transform);

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: S.ROOT
    }, /*#__PURE__*/_react["default"].createElement("div", {
      ref: this._refMenu,
      style: _pagesStyle
    }, /*#__PURE__*/_react["default"].createElement("div", {
      style: S.PAGE
    }, /*#__PURE__*/_react["default"].createElement(_MenuList["default"], {
      refFirstItem: this._refFirstItem,
      model: model,
      fOnClickItem: this._fOnClickItem
    }), /*#__PURE__*/_react["default"].createElement(_ErrMsg["default"], {
      errMsg: errMsg
    })), /*#__PURE__*/_react["default"].createElement(_PageList["default"], {
      pages: pages,
      pageCurrent: pageCurrent
    })));
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    var pageCurrent = this.state.pageCurrent;

    if (pageCurrent === 0) {
      setTimeout(this.focusFirst, 1000);
    }
  };

  return MenuSlider;
}(_react.Component);

var _default = MenuSlider;
exports["default"] = _default;
//# sourceMappingURL=MenuSlider.js.map