'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSelect = require('../zhn/InputSelect');

var _InputSelect2 = _interopRequireDefault(_InputSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = _DialogStyles2.default;

var RowInputSelect = function RowInputSelect(_ref) {
   var _ref$caption = _ref.caption,
       caption = _ref$caption === undefined ? '' : _ref$caption,
       rest = (0, _objectWithoutProperties3.default)(_ref, ['caption']);
   return _react2.default.createElement(
      'div',
      { style: styles.rowDiv },
      _react2.default.createElement(
         'span',
         { style: styles.labelSpan },
         caption
      ),
      _react2.default.createElement(_InputSelect2.default, (0, _extends3.default)({
         width: '250'
      }, rest))
   );
};

exports.default = RowInputSelect;
//# sourceMappingURL=RowInputSelect.js.map