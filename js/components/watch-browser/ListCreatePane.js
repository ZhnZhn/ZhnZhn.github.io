"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var ListCreatePane = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ListCreatePane, _Component);

  /*
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    actionFailed: PropTypes.string,
    forActionType: PropTypes.string,
    msgOnNotSelect: PropTypes.func,
    msgOnIsEmptyName: PropTypes.func,
    onCreate: PropTypes.func,
    onClose: PropTypes.func
  }
  */
  function ListCreatePane(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          actionCompleted = _this$props.actionCompleted,
          actionFailed = _this$props.actionFailed,
          forActionType = _this$props.forActionType,
          store = _this$props.store;

      if (actionType === actionCompleted) {
        if (data.forActionType === forActionType) {
          _this._handleClear();
        }

        _this.setState({
          groupOptions: store.getWatchGroups()
        });
      } else if (actionType === actionFailed && data.forActionType === forActionType) {
        _this.setState({
          validationMessages: data.messages
        });
      }
    };

    _this._handleSelectGroup = function (item) {
      _this.captionGroup = item && item.caption || null;
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
          msgOnNotSelect = _this$props2.msgOnNotSelect,
          msgOnIsEmptyName = _this$props2.msgOnIsEmptyName,
          captionList = _this.inputText.getValue();

      if (_this.captionGroup && captionList) {
        onCreate({
          captionGroup: _this.captionGroup,
          captionList: captionList
        });
      } else {
        var msg = [];

        if (!_this.captionGroup) {
          msg.push(msgOnNotSelect('In Group'));
        }

        if (!captionList) {
          msg.push(msgOnIsEmptyName('List'));
        }

        _this.setState({
          validationMessages: msg
        });
      }
    };

    _this._refInputText = function (c) {
      return _this.inputText = c;
    };

    _this.captionGroup = null;
    _this._primaryBt = /*#__PURE__*/_react["default"].createElement(_Atoms["default"].Button.Primary, {
      caption: "Create",
      title: "Create New List",
      onClick: _this._handleCreate
    });
    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      validationMessages: []
    };
    return _this;
  }

  var _proto = ListCreatePane.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var onClose = this.props.onClose,
        _this$state = this.state,
        groupOptions = _this$state.groupOptions,
        validationMessages = _this$state.validationMessages;
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Atoms["default"].RowInputSelect, {
      caption: "In Group:",
      options: groupOptions,
      onSelect: this._handleSelectGroup
    }), /*#__PURE__*/_react["default"].createElement(_Atoms["default"].RowInputText, {
      ref: this._refInputText,
      caption: "List:"
    }), /*#__PURE__*/_react["default"].createElement(_Atoms["default"].ValidationMessages, {
      validationMessages: validationMessages
    }), /*#__PURE__*/_react["default"].createElement(_Atoms["default"].RowButtons, {
      Primary: this._primaryBt,
      onClear: this._handleClear,
      onClose: onClose
    }));
  };

  return ListCreatePane;
}(_react.Component);

var _default = ListCreatePane;
exports["default"] = _default;
//# sourceMappingURL=ListCreatePane.js.map