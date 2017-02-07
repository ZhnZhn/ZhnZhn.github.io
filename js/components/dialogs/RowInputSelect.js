'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ZhSelect = require('../ZhSelect');

var _ZhSelect2 = _interopRequireDefault(_ZhSelect);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = _DialogStyles2.default;

var RowInputSelect = function RowInputSelect(_ref) {
   var caption = _ref.caption,
       rest = _objectWithoutProperties(_ref, ['caption']);

   return _react2.default.createElement(
      'div',
      { style: styles.rowDiv },
      _react2.default.createElement(
         'span',
         { style: styles.labelSpan },
         caption
      ),
      _react2.default.createElement(_ZhSelect2.default, _extends({
         width: '250'
      }, rest))
   );
};

exports.default = RowInputSelect;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\dialogs\RowInputSelect.js.map