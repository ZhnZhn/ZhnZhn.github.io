'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

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

var GroupAddPane = _react2.default.createClass({
  displayName: 'GroupAddPane',
  propTypes: {
    store: _react2.default.PropTypes.object,
    actionCompleted: _react2.default.PropTypes.string,
    actionFailed: _react2.default.PropTypes.string,
    forActionType: _react2.default.PropTypes.string,
    msgOnIsEmptyName: _react2.default.PropTypes.func,
    onCreate: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func
  },
  getInitialState: function getInitialState() {
    return {
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
        forActionType = _props.forActionType;

    if (actionType === actionCompleted && data.forActionType === forActionType) {
      this._handlerClear();
    } else if (actionType === actionFailed && data.forActionType === forActionType) {
      this.setState({ validationMessages: data.messages });
    }
  },
  _handlerClear: function _handlerClear() {
    this.inputText.setValue('');
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: [] });
    }
  },
  _handlerCreate: function _handlerCreate() {
    var caption = this.inputText.getValue();
    if (caption) {
      this.props.onCreate({ caption: caption });
    } else {
      this.inputText.setValue('');
      this.setState({ validationMessages: [this.props.msgOnIsEmptyName('Group')] });
    }
  },
  render: function render() {
    var _this = this;

    var onClose = this.props.onClose,
        validationMessages = this.state.validationMessages;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_RowInputText2.default, {
        ref: function ref(c) {
          return _this.inputText = c;
        },
        caption: 'Group:'
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

exports.default = GroupAddPane;
//# sourceMappingURL=GroupAddPane.js.map