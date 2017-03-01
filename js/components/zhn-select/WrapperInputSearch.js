'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TransformFn = require('./TransformFn');

var _TransformFn2 = _interopRequireDefault(_TransformFn);

var _InputSearch = require('./InputSearch');

var _InputSearch2 = _interopRequireDefault(_InputSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WrapperInputSearch = function (_Component) {
  _inherits(WrapperInputSearch, _Component);

  function WrapperInputSearch() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WrapperInputSearch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrapperInputSearch.__proto__ || Object.getPrototypeOf(WrapperInputSearch)).call.apply(_ref, [this].concat(args))), _this), _this._handleSelectItem = function (item) {
      if (item) {
        _this.props.onSelect(item);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WrapperInputSearch, [{
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
        _react2.default.createElement(_InputSearch2.default, {
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