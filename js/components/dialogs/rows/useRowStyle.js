'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _DialogStyles = require('../../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useRowStyle = function useRowStyle(_ref, isOc) {
  var isShowLabels = _ref.isShowLabels,
      captionStyle = _ref.captionStyle;

  var _style = isOc ? _DialogStyles2.default.crRowOcSelectStyle(isShowLabels, captionStyle) : _DialogStyles2.default.crRowLabelStyle(isShowLabels, captionStyle);
  return (0, _extends3.default)({}, _style);
};

exports.default = useRowStyle;
//# sourceMappingURL=useRowStyle.js.map