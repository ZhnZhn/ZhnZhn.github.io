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

var _TransformFn = require('./TransformFn');

var _TransformFn2 = _interopRequireDefault(_TransformFn);

var _InputSelect = require('./InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrapperInputSearch = function (_Component) {
  (0, _inherits3.default)(WrapperInputSearch, _Component);

  function WrapperInputSearch() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, WrapperInputSearch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WrapperInputSearch.__proto__ || Object.getPrototypeOf(WrapperInputSearch)).call.apply(_ref, [this].concat(args))), _this), _this._handleSelectItem = function (item) {
      if (item) {
        _this.props.onSelect(item);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(WrapperInputSearch, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          _props$placeholder = _props.placeholder,
          placeholder = _props$placeholder === undefined ? '' : _props$placeholder,
          _props$data = _props.data,
          data = _props$data === undefined ? {} : _props$data,
          ItemOptionComp = _props.ItemOptionComp,
          meta = data.meta,
          _meta$caption = meta.caption,
          caption = _meta$caption === undefined ? {} : _meta$caption,
          _options = _TransformFn2.default.fromLevel3(data);

      return _react2.default.createElement(
        'div',
        { style: style },
        _react2.default.createElement(_InputSelect2.default, {
          width: '100%',
          isShowOptionAnim: true,
          placeholder: placeholder,
          propCaption: caption,
          options: _options,
          ItemOptionComp: ItemOptionComp,
          onSelect: this._handleSelectItem
        })
      );
    }
  }]);
  return WrapperInputSearch;
}(_react.Component);

exports.default = WrapperInputSearch;
//# sourceMappingURL=WrapperInputSearch.js.map