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

var _Pane = require('./Pane.Style');

var _Pane2 = _interopRequireDefault(_Pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListEditPane = function (_Component) {
  (0, _inherits3.default)(ListEditPane, _Component);

  function ListEditPane(props) {
    (0, _classCallCheck3.default)(this, ListEditPane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ListEditPane.__proto__ || Object.getPrototypeOf(ListEditPane)).call(this));

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          actionCompleted = _this$props.actionCompleted,
          actionFailed = _this$props.actionFailed,
          forActionType = _this$props.forActionType,
          store = _this$props.store;

      if (actionType === actionCompleted) {
        if (data.forActionType === forActionType) {
          _this._handleClear();
        }
        _this.setState({ groupOptions: store.getWatchGroups() });
      } else if (actionType === actionFailed && data.forActionType === forActionType) {
        _this.setState({ validationMessages: data.messages });
      }
    };

    _this._handleClear = function () {
      _this.inputText.setValue('');
      if (_this.state.validationMessages.length > 0) {
        _this.setState({ validationMessages: [] });
      }
    };

    _this._handleRename = function () {
      var _this$props2 = _this.props,
          onRename = _this$props2.onRename,
          msgOnIsEmptyName = _this$props2.msgOnIsEmptyName,
          msgOnNotSelect = _this$props2.msgOnNotSelect,
          _this$selectGroupList = _this.selectGroupList.getValue(),
          captionGroup = _this$selectGroupList.captionGroup,
          captionList = _this$selectGroupList.captionList,
          captionListTo = _this.inputText.getValue();

      if (captionGroup && captionList && captionListTo) {
        onRename({
          captionGroup: captionGroup,
          captionListFrom: captionList,
          captionListTo: captionListTo
        });
      } else {
        var msg = [];
        if (!captionGroup) {
          msg.push(msgOnNotSelect('Group'));
        }
        if (!captionList) {
          msg.push(msgOnNotSelect('List From'));
        }
        if (!captionListTo) {
          msg.push(msgOnIsEmptyName('List To'));
        }
        _this.setState({ validationMessages: msg });
      }
    };

    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      listOptions: [],
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(ListEditPane, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.unsubscribe = this.props.store.listen(this._onStore);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          store = _props.store,
          onClose = _props.onClose,
          _state = this.state,
          groupOptions = _state.groupOptions,
          validationMessages = _state.validationMessages;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FragmentSelectGroupList2.default, {
          ref: function ref(c) {
            return _this2.selectGroupList = c;
          },
          store: store,
          groupCaption: 'In Group:',
          groupOptions: groupOptions,
          listCaption: 'List From:'
        }),
        _react2.default.createElement(_RowInputText2.default, {
          ref: function ref(c) {
            return _this2.inputText = c;
          },
          caption: 'List To:'
        }),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        }),
        _react2.default.createElement(
          'div',
          { style: _Pane2.default.COMMAND_DIV },
          _react2.default.createElement(_ActionButton2.default, {
            type: 'TypeC',
            caption: 'Rename',
            onClick: this._handleRename
          }),
          _react2.default.createElement(_ActionButton2.default, {
            type: 'TypeC',
            caption: 'Clear',
            onClick: this._handleClear
          }),
          _react2.default.createElement(_ActionButton2.default, {
            type: 'TypeC',
            caption: 'Close',
            onClick: onClose
          })
        )
      );
    }
  }]);
  return ListEditPane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ListEditPane.propTypes = {
  store: _react.PropTypes.shape({
    listen: _react.PropTypes.func,
    getWatchGroups: _react.PropTypes.func
  }),
  actionCompleted: _react.PropTypes.string,
  forActionType: _react.PropTypes.string,
  onRename: _react.PropTypes.func,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = ListEditPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\ListEditPane.js.map