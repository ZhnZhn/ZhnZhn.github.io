"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _Atoms = _interopRequireDefault(require("./Atoms"));

//import PropTypes from "prop-types";
var ListDeletePane = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(ListDeletePane, _Component);

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
  function ListDeletePane(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          actionCompleted = _this$props.actionCompleted,
          forActionType = _this$props.forActionType,
          store = _this$props.store;

      if (actionType === actionCompleted) {
        if (data.forActionType === forActionType) {
          _this._handleClear();
        }

        _this.setState({
          groupOptions: store.getWatchGroups()
        });
      }
    };

    _this._handleClear = function () {
      if (_this.state.validationMessages.length > 0) {
        _this.setState({
          validationMessages: []
        });
      }
    };

    _this._handleDelete = function () {
      var _this$props2 = _this.props,
          onDelete = _this$props2.onDelete,
          msgOnNotSelect = _this$props2.msgOnNotSelect,
          _this$selectGroupList = _this.selectGroupList.getValue(),
          captionGroup = _this$selectGroupList.captionGroup,
          captionList = _this$selectGroupList.captionList;

      if (captionGroup && captionList) {
        onDelete({
          captionGroup: captionGroup,
          captionList: captionList
        });
      } else {
        var msg = [];

        if (!captionGroup) {
          msg.push(msgOnNotSelect('Group'));
        }

        if (!captionList) {
          msg.push(msgOnNotSelect('List'));
        }

        _this.setState({
          validationMessages: msg
        });
      }
    };

    _this._primaryBt = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].Button.Primary, {
      caption: "Delete",
      title: "Delete List",
      onClick: _this._handleDelete
    });
    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      validationMessages: []
    };
    return _this;
  }

  var _proto = ListDeletePane.prototype;

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
        listCaption: "List:"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].ValidationMessages, {
        validationMessages: validationMessages
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Atoms["default"].RowButtons, {
        Primary: this._primaryBt,
        onClear: this._handleClear,
        onClose: onClose
      })]
    });
  };

  return ListDeletePane;
}(_react.Component);

var _default = ListDeletePane;
exports["default"] = _default;
//# sourceMappingURL=ListDeletePane.js.map