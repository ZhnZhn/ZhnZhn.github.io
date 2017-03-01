'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

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

var GroupDeletePane = _react2.default.createClass({
  displayName: 'GroupDeletePane',
  propTypes: {
    store: _react2.default.PropTypes.object,
    actionCompleted: _react2.default.PropTypes.string,
    forActionType: _react2.default.PropTypes.string,
    msgOnNotSelect: _react2.default.PropTypes.func,
    onDelete: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func
  },
  getInitialState: function getInitialState() {
    var store = this.props.store;

    this.caption = null;
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
        forActionType = _props.forActionType,
        store = _props.store;

    if (actionType === actionCompleted) {
      if (data.forActionType === forActionType) {
        this._handlerClear();
      }
      this.setState({ groupOptions: store.getWatchGroups() });
    }
  },
  _handlerSelectGroup: function _handlerSelectGroup(item) {
    if (item && item.caption) {
      this.caption = item.caption;
    } else {
      this.caption = null;
    }
  },
  _handlerClear: function _handlerClear() {
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: [] });
    }
  },
  _handlerDeleteGroup: function _handlerDeleteGroup() {
    if (this.caption) {
      this.props.onDelete({ caption: this.caption });
    } else {
      this.setState({ validationMessages: [this.props.msgOnNotSelect('Group')] });
    }
  },
  render: function render() {
    var onClose = this.props.onClose,
        _state = this.state,
        groupOptions = _state.groupOptions,
        validationMessages = _state.validationMessages;


    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_RowInputSelect2.default, {
        caption: 'Group:',
        options: groupOptions
        //isUpdateOptions={true}
        , onSelect: this._handlerSelectGroup
      }),
      _react2.default.createElement(_ValidationMessages2.default, {
        validationMessages: validationMessages
      }),
      _react2.default.createElement(
        'div',
        { style: Styles.COMMAND_DIV },
        _react2.default.createElement(_ActionButton2.default, {
          type: 'TypeC',
          caption: 'Delete',
          onClick: this._handlerDeleteGroup
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

exports.default = GroupDeletePane;
//# sourceMappingURL=GroupDeletePane.js.map