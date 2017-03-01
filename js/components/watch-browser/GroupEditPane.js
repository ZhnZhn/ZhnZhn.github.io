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

var GroupEditPane = _react2.default.createClass({
  displayName: 'GroupEditPane',
  propTypes: {
    store: _react2.default.PropTypes.object,
    actionCompleted: _react2.default.PropTypes.string,
    actionFailed: _react2.default.PropTypes.string,
    forActionType: _react2.default.PropTypes.string,
    msgOnIsEmptyName: _react2.default.PropTypes.func,
    msgOnNotSelect: _react2.default.PropTypes.func,
    onRename: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func
  },
  getInitialState: function getInitialState() {
    var store = this.props.store;

    this.captionFrom = null;
    return {
      groupOptions: store.getWatchGroups(),
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
      if (data.forActionType === forActionType) {
        this._handlerClear();
      }
      this.setState({ groupOptions: store.getWatchGroups() });
    } else if (actionType === actionFailed && data.forActionType === forActionType) {
      this.setState({ validationMessages: data.messages });
    }
  },
  _handlerSelectGroup: function _handlerSelectGroup(item) {
    if (item && item.caption) {
      this.captionFrom = item.caption;
    } else {
      this.captionFrom = null;
    }
  },
  _handlerClear: function _handlerClear() {
    this.inputText.setValue('');
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: [] });
    }
  },
  _handlerRename: function _handlerRename() {
    var captionTo = this.inputText.getValue();
    if (captionTo && this.captionFrom) {
      this.props.onRename({ captionFrom: this.captionFrom, captionTo: captionTo });
    } else {
      var msg = [];
      if (!this.captionFrom) {
        msg.push(this.props.msgOnNotSelect('Group From'));
      }
      if (!captionTo) {
        msg.push(this.props.msgOnIsEmptyName('Group To'));
      }
      this.setState({ validationMessages: msg });
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
        caption: 'Group From:',
        options: groupOptions,
        onSelect: this._handlerSelectGroup
      }),
      _react2.default.createElement(_RowInputText2.default, {
        ref: function ref(c) {
          return _this.inputText = c;
        },
        caption: 'Group To:'
      }),
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      }),
      _react2.default.createElement(
        'div',
        { style: Styles.COMMAND_DIV },
        _react2.default.createElement(_ActionButton2.default, {
          type: 'TypeC',
          caption: 'Rename',
          onClick: this._handlerRename
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

exports.default = GroupEditPane;
//# sourceMappingURL=GroupEditPane.js.map