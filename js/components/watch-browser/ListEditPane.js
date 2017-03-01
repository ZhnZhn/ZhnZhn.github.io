'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FragmentSelectGroupList = require('./FragmentSelectGroupList');

var _FragmentSelectGroupList2 = _interopRequireDefault(_FragmentSelectGroupList);

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

var ListEditPane = _react2.default.createClass({
  displayName: 'ListEditPane',
  propTypes: {
    store: _react2.default.PropTypes.object,
    actionCompleted: _react2.default.PropTypes.string,
    forActionType: _react2.default.PropTypes.string,
    onRename: _react2.default.PropTypes.func,
    onClose: _react2.default.PropTypes.func
  },

  getInitialState: function getInitialState() {
    var store = this.props.store;

    return {
      groupOptions: store.getWatchGroups(),
      listOptions: [],
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
  _handlerClear: function _handlerClear(isFullClear) {
    this.inputText.setValue('');
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: [] });
    }
  },
  _handlerRename: function _handlerRename() {
    var _selectGroupList$getV = this.selectGroupList.getValue(),
        captionGroup = _selectGroupList$getV.captionGroup,
        captionList = _selectGroupList$getV.captionList,
        captionListTo = this.inputText.getValue();

    if (captionGroup && captionList && captionListTo) {
      this.props.onRename({
        captionGroup: captionGroup,
        captionListFrom: captionList,
        captionListTo: captionListTo
      });
    } else {
      var _props2 = this.props,
          msgOnIsEmptyName = _props2.msgOnIsEmptyName,
          msgOnNotSelect = _props2.msgOnNotSelect,
          msg = [];

      if (!captionGroup) {
        msg.push(msgOnNotSelect('Group'));
      }
      if (!captionList) {
        msg.push(msgOnNotSelect('List From'));
      }
      if (!captionListTo) {
        msg.push(msgOnIsEmptyName('List To'));
      }
      this.setState({ validationMessages: msg });
    }
  },
  render: function render() {
    var _this = this;

    var _props3 = this.props,
        store = _props3.store,
        onClose = _props3.onClose,
        _state = this.state,
        groupOptions = _state.groupOptions,
        validationMessages = _state.validationMessages;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_FragmentSelectGroupList2.default, {
        ref: function ref(c) {
          return _this.selectGroupList = c;
        },
        store: store,
        groupCaption: 'In Group:',
        groupOptions: groupOptions,
        listCaption: 'List From:'
      }),
      _react2.default.createElement(_RowInputText2.default, {
        ref: function ref(c) {
          return _this.inputText = c;
        },
        caption: 'List To:'
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

exports.default = ListEditPane;
//# sourceMappingURL=ListEditPane.js.map