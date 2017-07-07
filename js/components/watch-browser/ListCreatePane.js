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

var _RowInputText = require('./RowInputText');

var _RowInputText2 = _interopRequireDefault(_RowInputText);

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _RowButtons = require('./RowButtons');

var _RowButtons2 = _interopRequireDefault(_RowButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListCreatePane = function (_Component) {
  (0, _inherits3.default)(ListCreatePane, _Component);

  function ListCreatePane(props) {
    (0, _classCallCheck3.default)(this, ListCreatePane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ListCreatePane.__proto__ || Object.getPrototypeOf(ListCreatePane)).call(this));

    _this._onStore = function (actionType, data) {
      var _this$props = _this.props,
          actionCompleted = _this$props.actionCompleted,
          actionFailed = _this$props.actionFailed,
          forActionType = _this$props.forActionType,
          store = _this$props.store;

      if (actionType === actionCompleted) {
        var isUpdateGroup = true;
        if (data.forActionType === forActionType) {
          _this._handleClear();
          isUpdateGroup = false;
        }
        _this.setState({
          groupOptions: store.getWatchGroups(),
          isUpdateGroup: isUpdateGroup
        });
      } else if (actionType === actionFailed && data.forActionType === forActionType) {
        _this.setState({
          validationMessages: data.messages,
          isUpdateGroup: false
        });
      }
    };

    _this._handleSelectGroup = function (item) {
      if (item && item.caption) {
        _this.captionGroup = item.caption;
      } else {
        _this.captionGroup = null;
      }
    };

    _this._handleClear = function () {
      _this.inputText.setValue('');
      if (_this.state.validationMessages.length > 0) {
        _this.setState({ validationMessages: [], isUpdateGroup: false });
      }
    };

    _this._handleCreate = function () {
      var _this$props2 = _this.props,
          onCreate = _this$props2.onCreate,
          msgOnNotSelect = _this$props2.msgOnNotSelect,
          msgOnIsEmptyName = _this$props2.msgOnIsEmptyName,
          captionList = _this.inputText.getValue();

      if (_this.captionGroup && captionList) {
        onCreate({
          captionGroup: _this.captionGroup,
          captionList: captionList
        });
      } else {
        var msg = [];
        if (!_this.captionGroup) {
          msg.push(msgOnNotSelect('In Group'));
        }
        if (!captionList) {
          msg.push(msgOnIsEmptyName('List'));
        }
        _this.setState({ validationMessages: msg, isUpdateGroup: false });
      }
    };

    _this.captionGroup = null;
    _this._primaryBt = _react2.default.createElement(_Button2.default.Primary, {
      caption: 'Create',
      title: 'Create New List',
      onClick: _this._handleCreate
    });
    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      isUpdateGroup: false,
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(ListCreatePane, [{
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
          _state = this.state,
          groupOptions = _state.groupOptions,
          validationMessages = _state.validationMessages;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: 'In Group:',
          options: groupOptions
          //isUpdateOptions={isUpdateGroup}
          , onSelect: this._handleSelectGroup
        }),
        _react2.default.createElement(_RowInputText2.default, {
          ref: function ref(c) {
            return _this2.inputText = c;
          },
          caption: 'List:'
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
  return ListCreatePane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ListCreatePane.propTypes = {
  store: _react.PropTypes.shape({
    listen: _react.PropTypes.func,
    getWatchGroups: _react.PropTypes.func
  }),
  actionCompleted: _react.PropTypes.string,
  actionFailed: _react.PropTypes.string,
  forActionType: _react.PropTypes.string,
  msgOnNotSelect: _react.PropTypes.func,
  msgOnIsEmptyName: _react.PropTypes.func,
  onCreate: _react.PropTypes.func,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = ListCreatePane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\ListCreatePane.js.map