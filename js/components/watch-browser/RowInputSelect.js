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

//import PropTypes from "prop-types";

var S = {
  CAPTION: {
    width: '120px'
  }
};

var RowInputSelect = function RowInputSelect(_ref) {
  var caption = _ref.caption,
      options = _ref.options,
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
      onSelect: onSelect
    })
  );
};

/*
RowInputSelect.propTypes = {
  caption: PropTypes.string,
  options: PropTypes.array,  
  onSelect: PropTypes.func
}
*/

exports.default = RowInputSelect;
//# sourceMappingURL=RowInputSelect.js.map