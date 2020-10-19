"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _WatchActions = _interopRequireWildcard(require("../../flux/actions/WatchActions"));

var _MsgWatch = _interopRequireDefault(require("../../constants/MsgWatch"));

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _Button = _interopRequireDefault(require("./Button"));

var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _withValidationLoad = _interopRequireDefault(require("../dialogs/decorators/withValidationLoad"));

var _class, _temp;

var addItem = _WatchActions["default"].addItem;
var actionCompleted = _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
    actionFailed = _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
    forActionType = _WatchActions.WatchActionTypes.ADD_ITEM;
var notSelected = _MsgWatch["default"].notSelected;
var S = {
  DIALOG: {
    width: 300
  },
  ITEM_CAPTION: {
    width: 100
  },
  CAPTION: {
    width: 70
  }
};
var SELECT_WIDTH = "216";

var AddToWatchDialog = (0, _withValidationLoad["default"])(_class = (_temp = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(AddToWatchDialog, _Component);

  /*
  static propTypes = {
    isShow  : PropTypes.bool,
    data    : PropTypes.object,
    store   : PropTypes.shape({
      listen: PropTypes.func,
      getWatchGroups: PropTypes.func,
      getWatchListsByGroup: PropTypes.func
    }),
    onClose : PropTypes.func
  }
  */
  function AddToWatchDialog(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._onStore = function (actionType, data) {
      if (actionType === actionCompleted && data.forActionType === forActionType) {
        if (_this.state.validationMessages.length > 0) {
          _this.setState({
            validationMessages: []
          });
        }

        _this.props.onClose();
      } else if (actionType === actionFailed && data.forActionType === forActionType) {
        _this.setState({
          validationMessages: data.messages
        });
      }
    };

    _this._handleSelectGroup = function (group) {
      if (group && group.caption) {
        _this.groupCaption = group.caption;

        if (group.lists) {
          _this.setState({
            listOptions: group.lists
          });
        } else {
          _this.setState({
            listOptions: []
          });
        }
      } else {
        _this.groupCaption = null;
      }
    };

    _this._handleSelectList = function (list) {
      if (list && list.caption) {
        _this.listCaption = list.caption;
      } else {
        _this.listCaption = null;
      }
    };

    _this._handleAdd = function () {
      var validationMessages = _this._getValidationMessages();

      if (validationMessages.isValid) {
        var data = _this.props.data,
            caption = data.caption,
            config = data.config,
            _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
            groupCaption = _assertThisInitialize.groupCaption,
            listCaption = _assertThisInitialize.listCaption;

        addItem({
          caption: caption,
          groupCaption: groupCaption,
          listCaption: listCaption,
          config: config
        });
      } else {
        _this._updateValidationMessages(validationMessages);
      }
    };

    _this._getValidationMessages = function () {
      var msg = [];

      if (!_this.groupCaption) {
        msg.push(notSelected('Group'));
      }

      if (!_this.listCaption) {
        msg.push(notSelected('List'));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    _this._handleClose = function () {
      if (_this.state.validationMessages.length > 0) {
        _this.setState({
          validationMessages: []
        });
      }

      _this.props.onClose();
    };

    _this.groupCaption = null;
    _this.listCaption = null;
    _this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button["default"].Flat, {
      caption: "Add",
      title: "Add Item To Watch List",
      isPrimary: true,
      onClick: _this._handleAdd
    }, "add")];
    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      listOptions: [],
      validationMessages: []
    };
    return _this;
  }

  var _proto = AddToWatchDialog.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  };

  _proto.componetWillUnmount = function componetWillUnmount() {
    this.unsubscribe();
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps.isShow !== this.props.isShow) {
      var groups = nextProps.store.getWatchGroups();

      if (groups !== this.state.groupOptions) {
        this.groupCaption = null;
        this.listCaption = null;
        this.setState({
          groupOptions: groups,
          listOptions: []
        });
      } else if (this.groupCaption) {
        var lists = nextProps.store.getWatchListsByGroup(this.groupCaption);

        if (lists !== this.state.listOptions) {
          this.listCaption = null;
          this.setState({
            listOptions: lists
          });
        }
      }
    }
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        isShow = _this$props.isShow,
        data = _this$props.data,
        caption = data.caption,
        _this$state = this.state,
        groupOptions = _this$state.groupOptions,
        listOptions = _this$state.listOptions,
        validationMessages = _this$state.validationMessages;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog["default"], {
      style: S.DIALOG,
      caption: "Add To Watch List",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: this._handleClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Row.Text, {
        styleCaption: S.CAPTION,
        caption: "Item:",
        text: caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputSelect, {
        caption: "Group",
        captionStyle: S.CAPTION,
        width: SELECT_WIDTH,
        options: groupOptions,
        onSelect: this._handleSelectGroup
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].RowInputSelect, {
        caption: "List",
        captionStyle: S.CAPTION,
        width: SELECT_WIDTH,
        onSelect: this._handleSelectList,
        options: listOptions
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages["default"], {
        validationMessages: validationMessages
      })]
    });
  };

  return AddToWatchDialog;
}(_react.Component), _temp)) || _class;

var _default = AddToWatchDialog;
exports["default"] = _default;
//# sourceMappingURL=AddToWatchDialog.js.map