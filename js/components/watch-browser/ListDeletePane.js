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

var _ValidationMessages = require('../zhn/ValidationMessages');

var _ValidationMessages2 = _interopRequireDefault(_ValidationMessages);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _RowButtons = require('./RowButtons');

var _RowButtons2 = _interopRequireDefault(_RowButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListDeletePane = function (_Component) {
  (0, _inherits3.default)(ListDeletePane, _Component);

  function ListDeletePane(props) {
    (0, _classCallCheck3.default)(this, ListDeletePane);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ListDeletePane.__proto__ || Object.getPrototypeOf(ListDeletePane)).call(this));

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

    _this._handleClear = function () {
      if (_this.state.validationMessages.length > 0) {
        _this.setState({ validationMessages: [] });
      }
    };

    _this._handleDelete = function () {
      var _this$props2 = _this.props,
          onDelete = _this$props2.onDelete,
          msgOnNotSelect = _this$props2.msgOnNotSelect,
          _this$selectGroupList = _this.selectGroupList.getValue(),
          captionGroup = _this$selectGroupList.captionGroup,
          captionList = _this$selectGroupList.captionList;

      if (captionGroup && captionList) {
        onDelete({ captionGroup: captionGroup, captionList: captionList });
      } else {
        var msg = [];
        if (!captionGroup) {
          msg.push(msgOnNotSelect('Group'));
        }
        if (!captionList) {
          msg.push(msgOnNotSelect('List'));
        }
        _this.setState({ validationMessages: msg });
      }
    };

    _this._primaryBt = _react2.default.createElement(_Button2.default.Primary, {
      caption: 'Delete',
      title: 'Delete List',
      onClick: _this._handleDelete
    });
    _this.state = {
      groupOptions: props.store.getWatchGroups(),
      validationMessages: []
    };
    return _this;
  }

  (0, _createClass3.default)(ListDeletePane, [{
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
          listCaption: 'List:'
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
  return ListDeletePane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? ListDeletePane.propTypes = {
  store: _react.PropTypes.shape({
    listen: _react.PropTypes.func,
    getWatchGroups: _react.PropTypes.func
  }),
  actionCompleted: _react.PropTypes.string,
  forActionType: _react.PropTypes.string,
  onRename: _react.PropTypes.func,
  onClose: _react.PropTypes.func
} : void 0;
exports.default = ListDeletePane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\ListDeletePane.js.map