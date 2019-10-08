'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class;
//import PropTypes from "prop-types";

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WatchActions = require('../../flux/actions/WatchActions');

var _WatchActions2 = _interopRequireDefault(_WatchActions);

var _MsgWatch = require('../../constants/MsgWatch');

var _MsgWatch2 = _interopRequireDefault(_MsgWatch);

var _ModalDialog = require('../zhn-moleculs/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _DialogCell = require('../dialogs/DialogCell');

var _DialogCell2 = _interopRequireDefault(_DialogCell);

var _withValidationLoad = require('../dialogs/decorators/withValidationLoad');

var _withValidationLoad2 = _interopRequireDefault(_withValidationLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addItem = _WatchActions2.default.addItem;

var actionCompleted = _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
    actionFailed = _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
    forActionType = _WatchActions.WatchActionTypes.ADD_ITEM;
var notSelected = _MsgWatch2.default.notSelected;

var AddToWatchDialog = (0, _withValidationLoad2.default)(_class = function (_Component) {
  (0, _inherits3.default)(AddToWatchDialog, _Component);

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
    (0, _classCallCheck3.default)(this, AddToWatchDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddToWatchDialog.__proto__ || Object.getPrototypeOf(AddToWatchDialog)).call(this));

    _this._onStore = function (actionType, data) {
      if (actionType === actionCompleted && data.forActionType === forActionType) {
        if (_this.state.validationMessages.length > 0) {
          _this.setState({ validationMessages: [] });
        }
        _this.props.onClose();
      } else if (actionType === actionFailed && data.forActionType === forActionType) {
        _this.setState({ validationMessages: data.messages });
      }
    };

    _this._handleSelectGroup = function (group) {
      if (group && group.caption) {
        _this.groupCaption = group.caption;
        if (group.lists) {
          _this.setState({ listOptions: group.lists });
        } else {
          _this.setState({ listOptions: [] });
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
            groupCaption = _this.groupCaption,
            listCaption = _this.listCaption;


        addItem({ caption: caption, groupCaption: groupCaption, listCaption: listCaption, config: config });
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
        _this.setState({ validationMessages: [] });
      }
      _this.props.onClose();
    };

    _this.groupCaption = null;
    _this.listCaption = null;
    _this._commandButtons = [_react2.default.createElement(_Button2.default.Flat, {
      key: 'add',
      caption: 'Add',
      title: 'Add Item To Watch List',
      isPrimary: true,
      onClick: _this._handleAdd
    })];
    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      listOptions: [],
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(AddToWatchDialog, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'componetWillUnmount',
    value: function componetWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps !== this.props && nextProps.isShow !== this.props.isShow) {
        var groups = nextProps.store.getWatchGroups();
        if (groups !== this.state.groupOptions) {
          this.groupCaption = null;
          this.listCaption = null;
          this.setState({ groupOptions: groups, listOptions: [] });
        } else if (this.groupCaption) {
          var lists = nextProps.store.getWatchListsByGroup(this.groupCaption);
          if (lists !== this.state.listOptions) {
            this.listCaption = null;
            this.setState({ listOptions: lists });
          }
        }
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isShow = _props.isShow,
          data = _props.data,
          caption = data.caption,
          _state = this.state,
          groupOptions = _state.groupOptions,
          listOptions = _state.listOptions,
          validationMessages = _state.validationMessages;


      return _react2.default.createElement(
        _ModalDialog2.default,
        {
          caption: 'Add To Watch List',
          isShow: isShow,
          commandButtons: this._commandButtons,
          onClose: this._handleClose
        },
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          caption: 'Group:',
          options: groupOptions,
          onSelect: this._handleSelectGroup
        }),
        _react2.default.createElement(_DialogCell2.default.RowInputSelect, {
          caption: 'List:',
          onSelect: this._handleSelectList,
          options: listOptions
        }),
        _react2.default.createElement(_DialogCell2.default.Row.Text, {
          caption: 'Item:',
          text: caption
        }),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        })
      );
    }
  }]);
  return AddToWatchDialog;
}(_react.Component)) || _class;

exports.default = AddToWatchDialog;
//# sourceMappingURL=AddToWatchDialog.js.map