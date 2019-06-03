'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _isArr = Array.isArray;

var _crDfItem = function _crDfItem(item, rootUri) {
  return {
    id: item[0],
    caption: item[1],
    uri: '' + rootUri + item[2],
    jsonProp: item[3]
  };
};
var _crIdItem = function _crIdItem(item, rootUri) {
  return {
    id: item[0],
    caption: item[0],
    uri: '' + rootUri + item[1] + '.json',
    jsonProp: item[2],
    isWithInput: Boolean(item[3])
  };
};

var _rFns = {
  df: _crDfItem,
  id: _crIdItem
};

var _mergeSelectProps = function _mergeSelectProps(selectProps, obj) {
  var arr = [].concat((0, _toConsumableArray3.default)(selectProps), (0, _toConsumableArray3.default)(obj.selectProps || []));
  return arr.length > 0 ? arr : undefined;
};
var _crSelectProps = function _crSelectProps(items) {
  var rootUri = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var spT = arguments[2];

  if (!_isArr(items)) {
    return;
  }
  var selectProps = [],
      _crItem = spT && _rFns[spT] || _rFns.df;
  items.forEach(function (item) {
    if (_isArr(item)) {
      selectProps.push(_crItem(item, rootUri));
    }
  });
  return { selectProps: selectProps };
};

var crSelectProps = function crSelectProps() {
  var initialProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var dialogProps = arguments[1];

  var selectProps = initialProps.selectProps,
      rootUri = initialProps.rootUri,
      spT = initialProps.spT,
      _selectItems = _isArr(selectProps) ? _mergeSelectProps(selectProps, dialogProps) : dialogProps.selectProps,
      _rootUri = dialogProps.rootUri || rootUri,
      _spT = dialogProps.spT || spT;

  return _crSelectProps(_selectItems, _rootUri, _spT);
};

exports.default = crSelectProps;
//# sourceMappingURL=crSelectProps.js.map