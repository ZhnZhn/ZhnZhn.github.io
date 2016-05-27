'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FragmentSelectGroupList = require('./FragmentSelectGroupList');

var _FragmentSelectGroupList2 = _interopRequireDefault(_FragmentSelectGroupList);

var _ValidationMessagesFragment = require('../ValidationMessagesFragment');

var _ValidationMessagesFragment2 = _interopRequireDefault(_ValidationMessagesFragment);

var _ToolBarButton = require('../ToolBarButton');

var _ToolBarButton2 = _interopRequireDefault(_ToolBarButton);

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
    var _props = this.props;
    var actionCompleted = _props.actionCompleted;
    var forActionType = _props.forActionType;
    var store = _props.store;

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
    var _selectGroupList$getV = this.selectGroupList.getValue();

    var captionGroup = _selectGroupList$getV.captionGroup;
    var captionList = _selectGroupList$getV.captionList;

    if (captionGroup && captionList) {
      this.props.onDelete({ captionGroup: captionGroup, captionList: captionList });
    } else {
      var msgOnNotSelect = this.props.msgOnNotSelect;
      var msg = [];
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

    var _props2 = this.props;
    var store = _props2.store;
    var onClose = _props2.onClose;
    var _state = this.state;
    var groupOptions = _state.groupOptions;
    var validationMessages = _state.validationMessages;

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
      _react2.default.createElement(_ValidationMessagesFragment2.default, {
        validationMessages: validationMessages
      }),
      _react2.default.createElement(
        'div',
        { style: Styles.COMMAND_DIV },
        _react2.default.createElement(_ToolBarButton2.default, {
          type: 'TypeC',
          caption: 'Delete',
          onClick: this._handlerDelete
        }),
        _react2.default.createElement(_ToolBarButton2.default, {
          type: 'TypeC',
          caption: 'Clear',
          onClick: this._handlerClear
        }),
        _react2.default.createElement(_ToolBarButton2.default, {
          type: 'TypeC',
          caption: 'Close',
          onClick: onClose
        })
      )
    );
  }
});

exports.default = ListDeletePane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\ListDeletePane.js.map