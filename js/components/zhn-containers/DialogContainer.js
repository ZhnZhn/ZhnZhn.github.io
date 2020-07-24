"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var S = {
  ROOT: {
    zIndex: 1030,
    position: 'absolute',
    top: 70,
    left: 10,
    width: '98%'
  }
};

var _findCompIndex = function _findCompIndex(arr, key) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].key === key) {
      return i;
    }
  }

  return;
};

var _doVisible = function _doVisible(arr, keyValue) {
  var _index = _findCompIndex(arr, keyValue) || 0;

  return [].concat(arr.slice(0, _index), arr.slice(_index + 1), [arr[_index]]);
};

var _updateVisible = function _updateVisible(state, key, maxDialog) {
  var hmIs = state.hmIs,
      visibleDialogs = state.visibleDialogs,
      _keyIndex = visibleDialogs.indexOf(key);

  if (_keyIndex !== -1) {
    visibleDialogs.splice(_keyIndex, 1);
  }

  visibleDialogs.push(key);
  hmIs[key] = true;

  if (visibleDialogs.length > maxDialog) {
    hmIs[visibleDialogs[0]] = false;
    visibleDialogs.splice(0, 1);
  }
};

var _findCompByKey = function _findCompByKey(comps, key) {
  var index = _findCompIndex(comps, key);

  return typeof index !== 'undefined' ? comps[index] : void 0;
};

var DialogContainer = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(DialogContainer, _Component);

  function DialogContainer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      hmIs: {},
      compDialogs: [],
      hmData: {},
      visibleDialogs: []
    };

    _this._onStore = function (actionType, option) {
      var showAction = _this.props.showAction;

      if (actionType === showAction) {
        _this.setState(function (prevState) {
          var key = option.key,
              Comp = option.Comp,
              data = option.data,
              maxDialog = _this.props.maxDialog;

          if (Comp && typeof _findCompIndex(prevState.compDialogs, key) !== 'undefined') {
            return null;
          }

          _updateVisible(prevState, key, maxDialog);

          if (!Comp) {
            prevState.compDialogs = _doVisible(prevState.compDialogs, key);
          } else {
            prevState.compDialogs.push(Comp);
          }

          prevState.hmData[key] = data;
          return prevState;
        });
      }
    };

    _this._handleToggleDialog = function (key) {
      var _this$state = _this.state,
          hmIs = _this$state.hmIs,
          compDialogs = _this$state.compDialogs;

      if (hmIs[key]) {
        var onCloseDialog = _this.props.onCloseDialog,
            _Comp = _findCompByKey(compDialogs, key);

        if (typeof onCloseDialog === 'function' && _Comp) {
          onCloseDialog(_Comp);
        }
      }

      _this.setState(function (prevState) {
        var hmIs = prevState.hmIs;
        hmIs[key] = !hmIs[key];

        if (!hmIs[key]) {
          var visibleDialogs = prevState.visibleDialogs,
              _keyIndex = visibleDialogs.indexOf(key);

          visibleDialogs.splice(_keyIndex, 1);
        }

        return prevState;
      });
    };

    _this._handleToFront = function (key) {
      var visibleDialogs = _this.state.visibleDialogs;

      if (visibleDialogs[visibleDialogs.length - 1] !== key) {
        _this.setState(function (prevState) {
          prevState.compDialogs = _doVisible(prevState.compDialogs, key);

          var visibleDialogs = prevState.visibleDialogs,
              _keyIndex = visibleDialogs.indexOf(key);

          visibleDialogs.splice(_keyIndex, 1);
          visibleDialogs.push(key);
          return prevState;
        });
      }
    };

    _this._renderDialogs = function () {
      var _this$state2 = _this.state,
          hmIs = _this$state2.hmIs,
          compDialogs = _this$state2.compDialogs,
          hmData = _this$state2.hmData;
      return compDialogs.map(function (Comp) {
        var key = Comp.key;
        return /*#__PURE__*/_react["default"].cloneElement(Comp, {
          key: key,
          isShow: hmIs[key],
          optionData: hmData[key],
          onFront: _this._handleToFront.bind((0, _assertThisInitialized2["default"])(_this), key),
          onClose: _this._handleToggleDialog.bind((0, _assertThisInitialized2["default"])(_this), key)
        });
      });
    };

    return _this;
  }

  var _proto = DialogContainer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.componentDidCatch = function componentDidCatch(error, info) {
    /*
    console.log(error)
    console.log(info)
    */
  };

  _proto.render = function render() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      style: S.ROOT
    }, this._renderDialogs());
  };

  return DialogContainer;
}(_react.Component);

DialogContainer.defaultProps = {
  maxDialog: 3
};
var _default = DialogContainer;
exports["default"] = _default;
//# sourceMappingURL=DialogContainer.js.map