'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _useRow = require('./useRow');

var _useRow2 = _interopRequireDefault(_useRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useRowOptions = function useRowOptions(_ref) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      isOc = _ref2.isOc;

  var isShowLabels = _ref.isShowLabels,
      _ref$caption = _ref.caption,
      caption = _ref$caption === undefined ? '' : _ref$caption,
      captionStyle = _ref.captionStyle,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['isShowLabels', 'caption', 'captionStyle']);
  return (0, _extends3.default)({}, (0, _useRow2.default)({ isShowLabels: isShowLabels, caption: caption, captionStyle: captionStyle }, isOc), {
    options: (0, _extends3.default)({
      width: "250"
    }, rest, {
      optionName: isShowLabels ? '' : caption.replace(':', '')
    })
  });
};

exports.default = useRowOptions;
//# sourceMappingURL=useRowOptions.js.map