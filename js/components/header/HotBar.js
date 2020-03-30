"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _has = _interopRequireDefault(require("../has"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var S = {
  ROOT: {
    display: 'inline-block'
  },
  BT_D: {
    color: '#c0c0c0'
  },
  BT_CL: {
    color: '#f44336'
  }
};

var _isIn = function _isIn(arr, type) {
  var len = arr.length;
  var i = 0;

  for (; i < len; i++) {
    if (arr[i].type === type) {
      return true;
    }
  }

  return false;
};

var _crBtProps = function _crBtProps(index, caption) {
  if (caption === void 0) {
    caption = '';
  }

  var _accessKey = _has["default"].touch ? '' : (index + 1).toString();

  return {
    accessKey: _accessKey || void 0,
    caption: _accessKey + caption.substr(0, 3),
    title: caption
  };
};

var _calcMaxButtons = function _calcMaxButtons(props) {
  switch (_has["default"].strWidth) {
    case '"W600"':
      return 3;

    case '"W500"':
      return 2;

    case '"W360"':
      return 1;

    default:
      return props.maxButtons;
  }
};

var HotBar =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(HotBar, _Component);

  function HotBar(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._onStore = function (actionType, option) {
      var closeDialogAction = _this.props.closeDialogAction;

      if (actionType === closeDialogAction) {
        _this.setState(function (prevState) {
          var hotButtons = prevState.hotButtons,
              countButtons = prevState.countButtons;

          if (!_isIn(hotButtons, option.type)) {
            hotButtons[countButtons % _this._maxButtons] = option;
            prevState.countButtons += 1;
          }

          return prevState;
        });
      }
    };

    _this._hClean = function () {
      _this.setState({
        countButtons: 0,
        hotButtons: []
      });
    };

    _this._renderHotButtons = function (hotButtons, onShowDialog) {
      return hotButtons.map(function (conf, index) {
        var type = conf.type,
            caption = conf.caption;
        return _react["default"].createElement(_FlatButton["default"], (0, _extends2["default"])({}, _crBtProps(index, caption), {
          key: type,
          timeout: 0,
          style: S.BT_D,
          onClick: onShowDialog.bind(null, type)
        }));
      });
    };

    _this._btCleanEl = _react["default"].createElement(_FlatButton["default"], {
      key: "BT_CLEAN",
      timeout: 0,
      style: S.BT_CL,
      caption: "CL",
      title: "Clean Hot Bar",
      onClick: _this._hClean
    });
    _this._maxButtons = _calcMaxButtons(props);
    _this.state = {
      countButtons: 0,
      hotButtons: []
    };
    return _this;
  }

  var _proto = HotBar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var store = this.props.store;
    this.unsubscribe = store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var onShowDialog = this.props.onShowDialog,
        hotButtons = this.state.hotButtons,
        _cleanBtEl = hotButtons.length !== 0 ? this._btCleanEl : null;

    return _react["default"].createElement("div", {
      style: S.ROOT
    }, this._renderHotButtons(hotButtons, onShowDialog), _cleanBtEl);
  };

  return HotBar;
}(_react.Component);

HotBar.defaultProps = {
  maxButtons: 5
};
var _default = HotBar;
exports["default"] = _default;
//# sourceMappingURL=HotBar.js.map