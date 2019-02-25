'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isArray = Array.isArray;

var _mergeSelectProps = function _mergeSelectProps(selectProps, obj) {
  var arr = [].concat((0, _toConsumableArray3.default)(selectProps), (0, _toConsumableArray3.default)(obj.selectProps || []));
  return arr.length > 0 ? arr : undefined;
};
var _crSelectProps = function _crSelectProps(items, rootUri) {
  if (!_isArray(items)) {
    return;
  }
  var _rootUri = rootUri ? rootUri : '',
      selectProps = [];
  items.forEach(function (item) {
    if (_isArray(item)) {
      selectProps.push({
        id: item[0],
        caption: item[1],
        uri: '' + _rootUri + item[2],
        jsonProp: item[3]
      });
    }
  });
  return { selectProps: selectProps };
};

var crSelectProps = function crSelectProps(baseProps, dialogProps) {
  var selectProps = baseProps.selectProps,
      _selectItems = _isArray(selectProps) ? _mergeSelectProps(selectProps, dialogProps) : dialogProps.selectProps,
      _rootUri = baseProps.rootUri || dialogProps.rootUri;

  return _crSelectProps(_selectItems, _rootUri);
};

exports.default = crSelectProps;
//# sourceMappingURL=crSelectProps.js.map