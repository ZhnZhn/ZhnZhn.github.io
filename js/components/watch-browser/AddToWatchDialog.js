'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WithValidation = require('../dialogs/WithValidation');

var _WithValidation2 = _interopRequireDefault(_WithValidation);

var _WatchActions = require('../../flux/actions/WatchActions');

var _WatchActions2 = _interopRequireDefault(_WatchActions);

var _Msg = require('../../constants/Msg');

var _Msg2 = _interopRequireDefault(_Msg);

var _ModalDialog = require('../zhn/ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _InputSelect = require('../zhn/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var actionCompleted = _WatchActions.WatchActionTypes.EDIT_WATCH_COMPLETED,
    actionFailed = _WatchActions.WatchActionTypes.EDIT_WATCH_FAILED,
    forActionType = _WatchActions.WatchActionTypes.ADD_ITEM;

var AddToWatchDialog = _react2.default.createClass((0, _extends3.default)({}, _WithValidation2.default, {

  displayName: 'AddToWatchDialog',
  propTypes: {
    isShow: _react2.default.PropTypes.bool.isRequired,
    data: _react2.default.PropTypes.object.isRequired,
    store: _react2.default.PropTypes.object,
    onClose: _react2.default.PropTypes.func.isRequired
  },
  getInitialState: function getInitialState() {
    var store = this.props.store;

    this.groupCaption = null;
    this.listCaption = null;
    return {
      groupOptions: store.getWatchGroups(),
      listOptions: [],
      validationMessages: []
    };
  },
  componentDidMount: function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componetWillUnmount: function componetWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, data) {
    if (actionType === actionCompleted && data.forActionType === forActionType) {
      if (this.state.validationMessages.length > 0) {
        this.setState({ validationMessages: [] });
      }
      this.props.onClose();
    } else if (actionType === actionFailed && data.forActionType === forActionType) {
      this.setState({ validationMessages: data.messages });
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
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
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props && nextProps.isShow === this.props.isShow) {
      return false;
    }
    return true;
  },
  _handlerSelectGroup: function _handlerSelectGroup(group) {
    if (group && group.caption) {
      //const {store} = this.props;
      this.groupCaption = group.caption;
      if (group.lists) {
        this.setState({ listOptions: group.lists });
      } else {
        this.setState({ listOptions: [] });
      }
    } else {
      this.groupCaption = null;
    }
  },
  _handlerSelectList: function _handlerSelectList(list) {
    if (list && list.caption) {
      this.listCaption = list.caption;
    } else {
      this.listCaption = null;
    }
  },
  _handlerAdd: function _handlerAdd() {
    var validationMessages = this._getValidationMessages();
    if (validationMessages.isValid) {
      var data = this.props.data,
          caption = data.caption,
          config = data.config,
          groupCaption = this.groupCaption,
          listCaption = this.listCaption;


      _WatchActions2.default.addItem({ caption: caption, groupCaption: groupCaption, listCaption: listCaption, config: config });
    } else {
      this._updateValidationMessages(validationMessages);
    }
  },
  _getValidationMessages: function _getValidationMessages() {
    var msg = [];
    if (!this.groupCaption) {
      msg.push(_Msg2.default.NOT_SELECTED('Group'));
    }
    if (!this.listCaption) {
      msg.push(_Msg2.default.NOT_SELECTED('List'));
    }
    msg.isValid = msg.length === 0 ? true : false;
    return msg;
  },
  _handlerClose: function _handlerClose() {
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: [] });
    }
    this.props.onClose();
  },
  render: function render() {
    var _props = this.props,
        isShow = _props.isShow,
        data = _props.data,
        caption = data.caption,
        _state = this.state,
        groupOptions = _state.groupOptions,
        listOptions = _state.listOptions,
        validationMessages = _state.validationMessages,
        commandButtons = [_react2.default.createElement(_ActionButton2.default, {
      key: 'a',
      type: 'TypeC',
      caption: 'Add',
      onClick: this._handlerAdd
    })];

    return _react2.default.createElement(
      _ModalDialog2.default,
      {
        caption: 'Add To Watch List',
        isShow: isShow,
        commandButtons: commandButtons,
        onClose: this._handlerClose
      },
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '1' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Group:'
        ),
        _react2.default.createElement(_InputSelect2.default, {
          width: '250',
          options: groupOptions,
          onSelect: this._handlerSelectGroup
        })
      ),
      _react2.default.createElement(
        'div',
        { style: styles.rowDiv, key: '2' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'List:'
        ),
        _react2.default.createElement(_InputSelect2.default, {
          width: '250',
          onSelect: this._handlerSelectList,
          options: listOptions
        })
      ),
      _react2.default.createElement(
        'div',
        { style: Object.assign({}, styles.rowDiv, { lineHeight: 2 }), key: '3' },
        _react2.default.createElement(
          'span',
          { style: styles.labelSpan },
          'Item:'
        ),
        _react2.default.createElement(
          'span',
          { style: { fontWeight: 'bold' } },
          caption
        )
      ),
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      })
    );
  }
}));

exports.default = AddToWatchDialog;
//# sourceMappingURL=AddToWatchDialog.js.map