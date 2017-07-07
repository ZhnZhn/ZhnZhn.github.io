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

var _RowInputSelect = require('./RowInputSelect');

var _RowInputSelect2 = _interopRequireDefault(_RowInputSelect);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _RowButtons = require('./RowButtons');

var _RowButtons2 = _interopRequireDefault(_RowButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupDeletePane = function (_Component) {
  (0, _inherits3.default)(GroupDeletePane, _Component);

  function GroupDeletePane(props) {
    (0, _classCallCheck3.default)(this, GroupDeletePane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupDeletePane.__proto__ || Object.getPrototypeOf(GroupDeletePane)).call(this));

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          actionCompleted = _this$props.actionCompleted,
          forActionType = _this$props.forActionType,
          store = _this$props.store;

      if (actionType === actionCompleted) {
        if (data.forActionType === forActionType) {
          _this._handleClear();
        }
        _this.setState({ groupOptions: store.getWatchGroups() });
      }
    };

    _this._handleSelectGroup = function (item) {
      if (item && item.caption) {
        _this.caption = item.caption;
      } else {
        _this.caption = null;
      }
    };

    _this._handleClear = function () {
      if (_this.state.validationMessages.length > 0) {
        _this.setState({ validationMessages: [] });
      }
    };

    _this._handleDeleteGroup = function () {
      var _this$props2 = _this.props,
          onDelete = _this$props2.onDelete,
          msgOnNotSelect = _this$props2.msgOnNotSelect;

      if (_this.caption) {
        onDelete({ caption: _this.caption });
      } else {
        _this.setState({ validationMessages: [msgOnNotSelect('Group')] });
      }
    };

    _this.caption = null;
    _this._primaryBt = _react2.default.createElement(_Button2.default.Primary, {
      caption: 'Delete',
      title: 'Delete Group',
      onClick: _this._handleDeleteGroup
    });
    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(GroupDeletePane, [{
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
          , onSelect: this._handleSelectGroup
        }),
        _react2.default.createElement(_ValidationMessages2.default, {
          validationMessages: validationMessages
        }),
        _react2.default.createElement(_RowButtons2.default, {
          Primary: this._primaryBt,
          withoutClear: true,
          onClose: onClose
        })
      );
    }
  }]);
  return GroupDeletePane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? GroupDeletePane.propTypes = {
  store: _react.PropTypes.shape({
    listen: _react.PropTypes.func,
    getWatchGroups: _react.PropTypes.func
  }),
  actionCompleted: _react.PropTypes.string,
  forActionType: _react.PropTypes.string,
  msgOnNotSelect: _react.PropTypes.func,
  onDelete: _react.PropTypes.func,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = GroupDeletePane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\GroupDeletePane.js.map