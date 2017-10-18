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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _RowButtons = require('./RowButtons');

var _RowButtons2 = _interopRequireDefault(_RowButtons);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

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

    _this._primaryBt = _react2.default.createElement(_Button2.default.Primary, {
      caption: 'Create',
      title: 'Create New Group',
      onClick: _this._handleCreate
    });
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
        _react2.default.createElement(_RowButtons2.default, {
          Primary: this._primaryBt,
          onClear: this._handleClear,
          onClose: onClose
        })
      );
    }
  }]);
  return GroupAddPane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? GroupAddPane.propTypes = {
  store: _propTypes2.default.shape({
    listen: _propTypes2.default.func
  }),
  actionCompleted: _propTypes2.default.string,
  actionFailed: _propTypes2.default.string,
  forActionType: _propTypes2.default.string,
  msgOnIsEmptyName: _propTypes2.default.func,
  onCreate: _propTypes2.default.func,
  onClose: _propTypes2.default.func
} : void 0;
exports.default = GroupAddPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\GroupAddPane.js.map