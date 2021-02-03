"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ModalDialogContainer = _interopRequireDefault(require("../zhn-containers/ModalDialogContainer"));

var _ComponentActions = require("../../flux/actions/ComponentActions");

var _RouterModalDialog = _interopRequireDefault(require("./RouterModalDialog"));

//import PropTypes from "prop-types";
var _setTypeTo = function _setTypeTo(prevState, type, option) {
  prevState.shows[type] = true;
  prevState.data[type] = option;
  prevState.isShow = true;
  prevState.currentDialog = type;
  return (0, _extends2["default"])({}, prevState);
};

var _renderDialogs = function _renderDialogs(store, _ref, _handleClose) {
  var shows = _ref.shows,
      data = _ref.data,
      dialogs = _ref.dialogs;
  return dialogs.map(function (_ref2) {
    var type = _ref2.type,
        comp = _ref2.comp;
    return /*#__PURE__*/(0, _react.createElement)(comp, {
      key: type,
      isShow: shows[type],
      data: data[type],
      store: store,
      onClose: _handleClose.bind(null, type)
    });
  });
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
      isShow: false,
      inits: {},
      shows: {},
      data: {},
      dialogs: [],
      currentDialog: null
    };

    _this._onStore = function (actionType, option) {
      if (actionType === _ComponentActions.ComponentActionTypes.SHOW_MODAL_DIALOG) {
        var type = option.modalDialogType,
            inits = _this.state.inits;

        if (inits[type]) {
          Promise.resolve().then(function (_) {
            _this.setState(function (prevState) {
              return _setTypeTo(prevState, type, option);
            });
          });
        } else {
          _RouterModalDialog["default"].getDialog(type).then(function (comp) {
            return _this.setState(function (prevState) {
              prevState.dialogs.push({
                type: type,
                comp: comp
              });
              prevState.inits[type] = true;
              return _setTypeTo(prevState, type, option);
            });
          });
        }
      }
    };

    _this._hClose = function (type) {
      _this.setState(function (prevState) {
        prevState.shows[type] = false;
        prevState.isShow = false;
        prevState.currentDialog = null;
        return (0, _extends2["default"])({}, prevState);
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

  _proto.render = function render() {
    var store = this.props.store,
        _this$state = this.state,
        isShow = _this$state.isShow,
        currentDialog = _this$state.currentDialog;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalDialogContainer["default"], {
      isShow: isShow,
      onClose: this._hClose.bind(null, currentDialog),
      children: _renderDialogs(store, this.state, this._hClose)
    });
  };

  return DialogContainer;
}(_react.Component);

var _default = DialogContainer;
exports["default"] = _default;
//# sourceMappingURL=DialogContainer.js.map