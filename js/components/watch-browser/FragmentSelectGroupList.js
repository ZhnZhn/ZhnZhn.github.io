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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FragmentSelectGroupList = function (_Component) {
  (0, _inherits3.default)(FragmentSelectGroupList, _Component);

  function FragmentSelectGroupList(props) {
    (0, _classCallCheck3.default)(this, FragmentSelectGroupList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FragmentSelectGroupList.__proto__ || Object.getPrototypeOf(FragmentSelectGroupList)).call(this));

    _this._handleSelectGroup = function (item) {
      if (item && item.caption) {
        _this.groupCaption = item.caption;
        if (item.lists) {
          _this.setState({ listOptions: item.lists });
        } else {
          _this.setState({ listOptions: [] });
        }
      } else {
        _this.groupCaption = null;
      }
    };

    _this._handleSelectList = function (item) {
      _this.listCaption = item && item.caption ? item.caption : null;
    };

    _this.groupCaption = null;
    _this.listCaption = null;

    _this.state = {
      listOptions: []
    };
    return _this;
  }

  (0, _createClass3.default)(FragmentSelectGroupList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps !== this.props) {
        if (nextProps.groupOptions !== this.props.groupOptions) {
          this.groupCaption = null;
          this.listCaption = null;
          this.setState({ listOptions: [] });
        } else {
          if (this.groupCaption) {
            var listOptions = this.props.store.getWatchListsByGroup(this.groupCaption);
            if (listOptions !== this.state.listOptions) this.listCaption = null;
            this.setState({ listOptions: listOptions });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          groupCaption = _props.groupCaption,
          groupOptions = _props.groupOptions,
          listCaption = _props.listCaption,
          listOptions = this.state.listOptions;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: groupCaption,
          options: groupOptions,
          onSelect: this._handleSelectGroup
        }),
        _react2.default.createElement(_RowInputSelect2.default, {
          caption: listCaption,
          options: listOptions,
          onSelect: this._handleSelectList
        })
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return {
        captionGroup: this.groupCaption,
        captionList: this.listCaption
      };
    }
  }, {
    key: 'setValueNull',
    value: function setValueNull() {
      this.groupCaption = null;
      this.listCaption = null;
    }
  }]);
  return FragmentSelectGroupList;
}(_react.Component);

process.env.NODE_ENV !== "production" ? FragmentSelectGroupList.propTypes = {
  store: _react.PropTypes.shape({
    listen: _react.PropTypes.func,
    getWatchListsByGroup: _react.PropTypes.func
  }),
  groupCaption: _react.PropTypes.string,
  groupOptions: _react.PropTypes.array,
  listCaption: _react.PropTypes.string
} : void 0;
exports.default = FragmentSelectGroupList;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\FragmentSelectGroupList.js.map