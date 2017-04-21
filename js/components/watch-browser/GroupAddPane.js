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

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _ActionButton = require('../zhn/ActionButton');

var _ActionButton2 = _interopRequireDefault(_ActionButton);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _Pane = require('./Pane.Style');

var _Pane2 = _interopRequireDefault(_Pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupAddPane = function (_Component) {
  (0, _inherits3.default)(GroupAddPane, _Component);

  function GroupAddPane(props) {
    (0, _classCallCheck3.default)(this, GroupAddPane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupAddPane.__proto__ || Object.getPrototypeOf(GroupAddPane)).call(this));

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          actionCompleted = _this$props.actionCompleted,
          actionFailed = _this$props.actionFailed,
          forActionType = _this$props.forActionType;

      if (actionType === actionCompleted && data.forActionType === forActionType) {
        _this._handleClear();
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

    _this._handleCreate = function () {
      var _this$props2 = _this.props,
          onCreate = _this$props2.onCreate,
          msgOnIsEmptyName = _this$props2.msgOnIsEmptyName,
          caption = _this.inputText.getValue();

      if (caption) {
        onCreate({ caption: caption });
      } else {
        _this.inputText.setValue('');
        _this.setState({ validationMessages: [msgOnIsEmptyName('Group')] });
      }
    };

    _this.state = {
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(GroupAddPane, [{
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

      var onClose = this.props.onClose,
          validationMessages = this.state.validationMessages;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RowInputText2.default, {
          ref: function ref(c) {
            return _this2.inputText = c;
          },
          caption: 'Group:'
        }),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        }),
        _react2.default.createElement(
          'div',
          { style: _Pane2.default.COMMAND_DIV },
          _react2.default.createElement(_ActionButton2.default, {
            type: 'TypeC',
            caption: 'Create',
            onClick: this._handleCreate
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
  return GroupAddPane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? GroupAddPane.propTypes = {
  store: _react.PropTypes.shape({
    listen: _react.PropTypes.func
  }),
  actionCompleted: _react.PropTypes.string,
  actionFailed: _react.PropTypes.string,
  forActionType: _react.PropTypes.string,
  msgOnIsEmptyName: _react.PropTypes.func,
  onCreate: _react.PropTypes.func,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = GroupAddPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\GroupAddPane.js.map