'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSelect = require('../zhn-select/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import InputSelect from '../zhn/InputSelect';
var S = {
  CAPTION: {
    width: '120px'
  }
};

var RowInputSelect = function RowInputSelect(_ref) {
  var caption = _ref.caption,
      options = _ref.options,
      isUpdateOptions = _ref.isUpdateOptions,
      onSelect = _ref.onSelect;
  return _react2.default.createElement(
    'div',
    { style: _DialogStyles2.default.rowDiv },
    _react2.default.createElement(
      'span',
      { style: (0, _extends3.default)({}, _DialogStyles2.default.labelSpan, S.CAPTION) },
      caption
    ),
    _react2.default.createElement(_InputSelect2.default, {
      width: '250',
      options: options,
      isUpdateOptions: isUpdateOptions,
      onSelect: onSelect

    })
  );
};

process.env.NODE_ENV !== "production" ? RowInputSelect.propTypes = {
  caption: _react.PropTypes.string,
  options: _react.PropTypes.array,
  isUpdateOptions: _react.PropTypes.bool,
  onSelect: _react.PropTypes.func
} : void 0;

exports.default = RowInputSelect;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\watch-browser\RowInputSelect.js.map