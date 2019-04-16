'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _useRowStyle = require('./useRowStyle');

var _useRowStyle2 = _interopRequireDefault(_useRowStyle);

var _useRowCaption = require('./useRowCaption');

var _useRowCaption2 = _interopRequireDefault(_useRowCaption);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useRow = function useRow(_ref, isOc) {
  var isShowLabels = _ref.isShowLabels,
      caption = _ref.caption,
      captionStyle = _ref.captionStyle;
  return (0, _extends3.default)({}, (0, _useRowStyle2.default)({ isShowLabels: isShowLabels, captionStyle: captionStyle }, isOc), (0, _useRowCaption2.default)(caption));
};

exports.default = useRow;
//# sourceMappingURL=useRow.js.map