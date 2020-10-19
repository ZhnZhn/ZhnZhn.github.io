"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var GroupAddPane = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(GroupAddPane, _Component);

  /*
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    actionFailed: PropTypes.string,
    forActionType: PropTypes.string,
    msgOnIsEmptyName: PropTypes.func,
    onCreate: PropTypes.func,
    onClose: PropTypes.func
  }
  */
  function GroupAddPane(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          actionCompleted = _this$props.actionCompleted,
          actionFailed = _this$props.actionFailed,
          forActionType = _this$props.forActionType;

      if (actionType === actionCompleted && data.forActionType === forActionType) {
        _this._handleClear();
      } else if (actionType === actionFailed && data.forActionType === forActionType) {
        _this.setState({
          validationMessages: data.messages
        });
      }
    };

    _this._handleClear = function () {
      _this.inputText.setValue('');

      if (_this.state.validationMessages.length > 0) {
        _this.setState({
          validationMessages: []
        });
      }
    };

    _this._handleCreate = function () {
      var _this$props2 = _this.props,
          onCreate = _this$props2.onCreate,
          msgOnIsEmptyName = _this$props2.msgOnIsEmptyName,
          caption = _this.inputText.getValue();

      if (caption) {
        onCreate({
          caption: caption
        });
      } else {
        _this.inputText.setValue('');

        _this.setState({
          validationMessages: [msgOnIsEmptyName('Group')]
        });
      }
    };

    _this._primaryBt = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
      caption: "Create",
      title: "Create New Group",
      onClick: _this._handleCreate
    });
    _this.state = {
      validationMessages: []
    };
    return _this;
  }

  var _proto = GroupAddPane.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this2 = this;

    var onClose = this.props.onClose,
        validationMessages = this.state.validationMessages;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowInputText, {
        ref: function ref(c) {
          return _this2.inputText = c;
        },
        caption: "Group:"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].ValidationMessages, {
        validationMessages: validationMessages
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowButtons, {
        Primary: this._primaryBt,
        onClear: this._handleClear,
        onClose: onClose
      })]
    });
  };

  return GroupAddPane;
}(_react.Component);

var _default = GroupAddPane;
exports["default"] = _default;
//# sourceMappingURL=GroupAddPane.js.map