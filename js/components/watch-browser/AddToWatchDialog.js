"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _WatchActions = require("../../flux/actions/WatchActions");

var _MsgWatch = require("../../constants/MsgWatch");

var _ModalDialog = _interopRequireDefault(require("../zhn-moleculs/ModalDialog"));

var _Button = _interopRequireDefault(require("./Button"));

var _ValidationMessages = _interopRequireDefault(require("../zhn/ValidationMessages"));

var _DialogCell = _interopRequireDefault(require("../dialogs/DialogCell"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const addItem = _WatchActions.WatchActions[_WatchActions.WAT_ADD_ITEM],
      S_DIALOG = {
  width: 300
},
      S_CAPTION = {
  width: 70
},
      SELECT_WIDTH = "216";

class AddToWatchDialog extends _react.Component {
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
      if (actionType === _WatchActions.WAT_EDIT_WATCH_COMPLETED && data.forActionType === _WatchActions.WAT_ADD_ITEM) {
        if (this.state.validationMessages.length > 0) {
          this.setState({
            validationMessages: []
          });
        }

        this.props.onClose();
      } else if (actionType === _WatchActions.WAT_EDIT_WATCH_FAILED && data.forActionType === _WatchActions.WAT_ADD_ITEM) {
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

        if (this.state.validationMessages.length > 0) {
          this.setState({
            validationMessages
          });
        }
      } else {
        this.setState({
          validationMessages
        });
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

}

var _default = AddToWatchDialog;
exports.default = _default;
//# sourceMappingURL=AddToWatchDialog.js.map