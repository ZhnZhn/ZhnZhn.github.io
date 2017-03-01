'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FragmentSelectGroupList = require('./FragmentSelectGroupList');

var _FragmentSelectGroupList2 = _interopRequireDefault(_FragmentSelectGroupList);

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

var ListDeletePane = _react2.default.createClass({
  displayName: 'ListDeletePane',
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
  _handlerClear: function _handlerClear() {
    if (this.state.validationMessages.length > 0) {
      this.setState({ validationMessages: [] });
    }
  },
  _handlerDelete: function _handlerDelete() {
    var _selectGroupList$getV = this.selectGroupList.getValue(),
        captionGroup = _selectGroupList$getV.captionGroup,
        captionList = _selectGroupList$getV.captionList;

    if (captionGroup && captionList) {
      this.props.onDelete({ captionGroup: captionGroup, captionList: captionList });
    } else {
      var msgOnNotSelect = this.props.msgOnNotSelect,
          msg = [];

      if (!captionGroup) {
        msg.push(msgOnNotSelect('Group'));
      }
      if (!captionList) {
        msg.push(msgOnNotSelect('List'));
      }
      this.setState({ validationMessages: msg });
    }
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props,
        store = _props2.store,
        onClose = _props2.onClose,
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
        listCaption: 'List:'
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
          onClick: this._handlerDelete
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

exports.default = ListDeletePane;
//# sourceMappingURL=ListDeletePane.js.map