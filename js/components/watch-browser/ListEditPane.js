"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var ListEditPane = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ListEditPane, _Component);

  /*
  static propTypes = {
    store: PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func
    }),
    actionCompleted: PropTypes.string,
    forActionType: PropTypes.string,
    onRename: PropTypes.func,
    onClose: PropTypes.func
  }
  */
  function ListEditPane(props) {
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

    _this._handleClear = function () {
      _this.inputText.setValue('');

      if (_this.state.validationMessages.length > 0) {
        _this.setState({
          validationMessages: []
        });
      }
    };

    _this._handleRename = function () {
      var _this$props2 = _this.props,
          onRename = _this$props2.onRename,
          msgOnIsEmptyName = _this$props2.msgOnIsEmptyName,
          msgOnNotSelect = _this$props2.msgOnNotSelect,
          _this$selectGroupList = _this.selectGroupList.getValue(),
          captionGroup = _this$selectGroupList.captionGroup,
          captionList = _this$selectGroupList.captionList,
          captionListTo = _this.inputText.getValue();

      if (captionGroup && captionList && captionListTo) {
        onRename({
          captionGroup: captionGroup,
          captionListFrom: captionList,
          captionListTo: captionListTo
        });
      } else {
        var msg = [];

        if (!captionGroup) {
          msg.push(msgOnNotSelect('Group'));
        }

        if (!captionList) {
          msg.push(msgOnNotSelect('List From'));
        }

        if (!captionListTo) {
          msg.push(msgOnIsEmptyName('List To'));
        }

        _this.setState({
          validationMessages: msg
        });
      }
    };

    _this._primaryBt = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
      caption: "Edit",
      title: "Edit List Name",
      onClick: _this._handleRename
    });
    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      listOptions: [],
      validationMessages: []
    };
    return _this;
  }

  var _proto = ListEditPane.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unsubscribe();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        store = _this$props3.store,
        onClose = _this$props3.onClose,
        _this$state = this.state,
        groupOptions = _this$state.groupOptions,
        validationMessages = _this$state.validationMessages;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].FragmentSelectGroupList, {
        ref: function ref(c) {
          return _this2.selectGroupList = c;
        },
        store: store,
        groupCaption: "In Group:",
        groupOptions: groupOptions,
        listCaption: "List From:"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowInputText, {
        ref: function ref(c) {
          return _this2.inputText = c;
        },
        caption: "List To:"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].ValidationMessages, {
        validationMessages: validationMessages
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowButtons, {
        Primary: this._primaryBt,
        onClear: this._handleClear,
        onClose: onClose
      })]
    });
  };

  return ListEditPane;
}(_react.Component);

var _default = ListEditPane;
exports["default"] = _default;
//# sourceMappingURL=ListEditPane.js.map