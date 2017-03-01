'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = {
  COMMAND_DIV: {
    cursor: 'default',
    float: 'right',
    marginTop: '8px',
    marginBottom: '10px',
    marginRight: '4px'
  }
};

var ListCreatePane = _react2.default.createClass({
  displayName: 'ListCreatePane',
  propTypes: {
    store: _react2.default.PropTypes.object,
    actionCompleted: _react2.default.PropTypes.string,
    actionFailed: _react2.default.PropTypes.string,
    forActionType: _react2.default.PropTypes.string,
    msgOnNotSelect: _react2.default.PropTypes.func,
    msgOnIsEmptyName: _react2.default.PropTypes.func,
    onCreate: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func
  },

  getInitialState: function getInitialState() {
    var store = this.props.store;

    this.captionGroup = null;
    return {
      groupOptions: store.getWatchGroups(),
      isUpdateGroup: false,
      validationMessages: []
    };
  },
  componentDidMount: function componentDidMount() {
    this.unsubscribe = this.props.store.listen(this._onStore);
  },
  componentWillUnmount: function componentWillUnmount() {
    this.unsubscribe();
  },
  _onStore: function _onStore(actionType, data) {
    var _props = this.props,
        actionCompleted = _props.actionCompleted,
        actionFailed = _props.actionFailed,
        forActionType = _props.forActionType,
        store = _props.store;

    if (actionType === actionCompleted) {
      var isUpdateGroup = true;
      if (data.forActionType === forActionType) {
        this._handlerClear();
        isUpdateGroup = false;
      }
      this.setState({ groupOptions: store.getWatchGroups(), isUpdateGroup: isUpdateGroup });
    } else if (actionType === actionFailed && data.forActionType === forActionType) {
      this.setState({ validationMessages: data.messages, isUpdateGroup: false });
    }
  },
  _handlerSelectGroup: function _handlerSelectGroup(item) {
    if (item && item.caption) {
      this.captionGroup = item.caption;
    } else {
      this.captionGroup = null;
    }
  },
  _handlerClear: function _handlerClear() {
    this.inputText.setValue('');
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: [], isUpdateGroup: false });
    }
  },
  _handlerCreate: function _handlerCreate() {
    var captionList = this.inputText.getValue();
    if (this.captionGroup && captionList) {
      this.props.onCreate({
        captionGroup: this.captionGroup,
        captionList: captionList
      });
    } else {
      var _props2 = this.props,
          msgOnNotSelect = _props2.msgOnNotSelect,
          msgOnIsEmptyName = _props2.msgOnIsEmptyName,
          msg = [];

      if (!this.captionGroup) {
        msg.push(msgOnNotSelect('In Group'));
      }
      if (!captionList) {
        msg.push(msgOnIsEmptyName('List'));
      }
      this.setState({ validationMessages: msg, isUpdateGroup: false });
    }
  },
  render: function render() {
    var _this = this;

    var onClose = this.props.onClose,
        _state = this.state,
        groupOptions = _state.groupOptions,
        validationMessages = _state.validationMessages;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'In Group:',
        options: groupOptions
        //isUpdateOptions={isUpdateGroup}
        , onSelect: this._handlerSelectGroup
      }),
      _react2.default.createElement(_RowInputText2.default, {
        ref: function ref(c) {
          return _this.inputText = c;
        },
        caption: 'List:'
      }),
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      }),
      _react2.default.createElement(
        'div',
        { style: Styles.COMMAND_DIV },
        _react2.default.createElement(_ActionButton2.default, {
          type: 'TypeC',
          caption: 'Create',
          onClick: this._handlerCreate
        }),
        _react2.default.createElement(_ActionButton2.default, {
          type: 'TypeC',
          caption: 'Clear',
          onClick: this._handlerClear
        }),
        _react2.default.createElement(_ActionButton2.default, {
          type: 'TypeC',
          caption: 'Close',
          onClick: onClose
        })
      )
    );
  }
});

exports.default = ListCreatePane;
//# sourceMappingURL=ListCreatePane.js.map