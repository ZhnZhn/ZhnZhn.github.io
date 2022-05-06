"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _WatchActions = _interopRequireWildcard(require("../../flux/actions/WatchActions"));

var _MsgWatch = require("../../constants/MsgWatch");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _Button = _interopRequireDefault(require("./Button"));

var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _withValidationLoad = _interopRequireDefault(require("../dialogs/decorators/withValidationLoad"));

var _jsxRuntime = require("react/jsx-runtime");

var _class;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  addItem
} = _WatchActions.default,
      actionCompleted = _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
      actionFailed = _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
      forActionType = _WatchActions.WatchActionTypes.ADD_ITEM,
      S_DIALOG = {
  width: 300
},
      S_CAPTION = {
  width: 70
},
      SELECT_WIDTH = "216";

let AddToWatchDialog = (0, _withValidationLoad.default)(_class = class AddToWatchDialog extends _react.Component {
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
  constructor(props) {
    super(props);

    this._onStore = (actionType, data) => {
      if (actionType === actionCompleted && data.forActionType === forActionType) {
        if (this.state.validationMessages.length > 0) {
          this.setState({
            validationMessages: []
          });
        }

        this.props.onClose();
      } else if (actionType === actionFailed && data.forActionType === forActionType) {
        this.setState({
          validationMessages: data.messages
        });
      }
    };

    this._handleSelectGroup = group => {
      if (group && group.caption) {
        this.groupCaption = group.caption;

        if (group.lists) {
          this.setState({
            listOptions: group.lists
          });
        } else {
          this.setState({
            listOptions: []
          });
        }
      } else {
        this.groupCaption = null;
      }
    };

    this._handleSelectList = list => {
      if (list && list.caption) {
        this.listCaption = list.caption;
      } else {
        this.listCaption = null;
      }
    };

    this._handleAdd = () => {
      const validationMessages = this._getValidationMessages();

      if (validationMessages.isValid) {
        const {
          data
        } = this.props,
              {
          caption,
          config
        } = data,
              {
          groupCaption,
          listCaption
        } = this;
        addItem({
          caption,
          groupCaption,
          listCaption,
          config
        });
      } else {
        this._updateValidationMessages(validationMessages);
      }
    };

    this._getValidationMessages = () => {
      const msg = [];

      if (!this.groupCaption) {
        msg.push((0, _MsgWatch.notSelected)('Group'));
      }

      if (!this.listCaption) {
        msg.push((0, _MsgWatch.notSelected)('List'));
      }

      msg.isValid = msg.length === 0 ? true : false;
      return msg;
    };

    this._handleClose = () => {
      if (this.state.validationMessages.length > 0) {
        this.setState({
          validationMessages: []
        });
      }

      this.props.onClose();
    };

    this.groupCaption = null;
    this.listCaption = null;
    this._commandButtons = [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default.Flat, {
      caption: "Add",
      title: "Add Item To Watch List",
      isPrimary: true,
      onClick: this._handleAdd
    }, "add")];
    this.state = {
      groupOptions: props.store.getWatchGroups(),
      listOptions: [],
      validationMessages: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  }

  componetWillUnmount() {
    this.unsubscribe();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps.isShow !== this.props.isShow) {
      const groups = nextProps.store.getWatchGroups();

      if (groups !== this.state.groupOptions) {
        this.groupCaption = null;
        this.listCaption = null;
        this.setState({
          groupOptions: groups,
          listOptions: []
        });
      } else if (this.groupCaption) {
        const lists = nextProps.store.getWatchListsByGroup(this.groupCaption);

        if (lists !== this.state.listOptions) {
          this.listCaption = null;
          this.setState({
            listOptions: lists
          });
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }

    return true;
  }

  render() {
    const {
      isShow,
      data
    } = this.props,
          {
      caption
    } = data,
          {
      groupOptions,
      listOptions,
      validationMessages
    } = this.state;
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ModalDialog.default, {
      style: S_DIALOG,
      caption: "Add To Watch List",
      isShow: isShow,
      commandButtons: this._commandButtons,
      onClose: this._handleClose,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Row.Text, {
        styleCaption: S_CAPTION,
        caption: "Item:",
        text: caption
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        caption: "Group",
        captionStyle: S_CAPTION,
        width: SELECT_WIDTH,
        options: groupOptions,
        onSelect: this._handleSelectGroup
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.RowInputSelect, {
        caption: "List",
        captionStyle: S_CAPTION,
        width: SELECT_WIDTH,
        onSelect: this._handleSelectList,
        options: listOptions
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ValidationMessages.default, {
        validationMessages: validationMessages
      })]
    });
  }

}) || _class;

var _default = AddToWatchDialog;
exports.default = _default;
//# sourceMappingURL=AddToWatchDialog.js.map