"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _MenuTitle = _interopRequireDefault(require("./MenuTitle"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));

var T_O_FOCUS_FIRST = 1000;
var _isArr = Array.isArray;

var Frame =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Frame, _Component);

  function Frame() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      model: []
    };

    _this.loadMenu = function (id) {
      var _this$props = _this.props,
          _this$props$dfProps = _this$props.dfProps,
          dfProps = _this$props$dfProps === void 0 ? {} : _this$props$dfProps,
          loadItems = _this$props.loadItems,
          store = _this$props.store,
          lT = dfProps.lT,
          proxy = store.getProxy(lT);
      loadItems(dfProps.rootUrl + "/" + id, proxy).then(function (model) {
        if (_isArr(model)) {
          _this.setState({
            model: model,
            errMsg: undefined
          });
        }
      })["catch"](function (err) {
        _this.setState({
          errMsg: err.message
        });
      });
    };

    _this._renderMenu = function () {
      var _this$props2 = _this.props,
          _this$props2$dfProps = _this$props2.dfProps,
          dfProps = _this$props2$dfProps === void 0 ? {} : _this$props2$dfProps,
          pageNumber = _this$props2.pageNumber,
          store = _this$props2.store,
          lT = dfProps.lT,
          proxy = store.getProxy(lT),
          model = _this.state.model,
          _this$props3 = _this.props,
          onClickNext = _this$props3.onClickNext,
          fOnClickItem = _this$props3.fOnClickItem,
          rootId = _this$props3.id,
          items = model.map(function (item) {
        var text = item.text,
            id = item.id,
            type = item.type,
            _onClick = type === 'l' ? onClickNext.bind(null, rootId + "/" + id, text, pageNumber) : fOnClickItem((0, _extends2["default"])({
          id: rootId + "/" + id
        }, dfProps, {
          proxy: proxy
        }));

        return _react["default"].createElement(_MenuItem["default"], {
          key: id,
          item: item,
          onClick: _onClick
        });
      });
      return _react["default"].createElement("div", null, items);
    };

    _this._refFirst = function (n) {
      return _this._firstNode = n;
    };

    _this.focusFirst = function () {
      if (_this._firstNode) {
        _this._firstNode.focus();
      }
    };

    return _this;
  }

  var _proto = Frame.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props4 = this.props,
        title = _this$props4.title,
        id = _this$props4.id;

    if (title) {
      this.loadMenu(id);
    }
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        title = _this$props5.title,
        rootStyle = _this$props5.rootStyle,
        pageNumber = _this$props5.pageNumber,
        onClickPrev = _this$props5.onClickPrev,
        errMsg = this.state.errMsg;
    return _react["default"].createElement("div", {
      style: rootStyle
    }, _react["default"].createElement(_MenuTitle["default"], {
      ref: this._refFirst,
      title: title,
      onClick: onClickPrev.bind(null, pageNumber)
    }), this._renderMenu(), _react["default"].createElement(_ErrMsg["default"], {
      errMsg: errMsg
    }));
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props6 = this.props,
        pageNumber = _this$props6.pageNumber,
        pageCurrent = _this$props6.pageCurrent;

    if (pageNumber === pageCurrent) {
      setTimeout(this.focusFirst, T_O_FOCUS_FIRST);
    }
  };

  return Frame;
}(_react.Component);

var _default = Frame;
exports["default"] = _default;
//# sourceMappingURL=Frame.js.map