"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isArr = Array.isArray,
    _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
},
    _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _crJsonProp = function _crJsonProp(strOr) {
  return _isStr(strOr) ? strOr : void 0;
};

var _crDfItem = function _crDfItem(item, rootUri) {
  return {
    id: item[0],
    caption: item[1],
    uri: "" + rootUri + item[2] + ".json",
    jsonProp: _crJsonProp(item[3])
  };
};

var _crIdItem = function _crIdItem(item, rootUri) {
  return {
    id: item[0],
    caption: item[0],
    uri: "" + rootUri + item[1] + ".json",
    jsonProp: _crJsonProp(item[2]),
    isWithInput: Boolean(item[3])
  };
};

var _rFns = {
  df: _crDfItem,
  id: _crIdItem
};

var _mergeSelectProps = function _mergeSelectProps(selectProps, obj) {
  var arr = [].concat(selectProps);
  (obj.selectProps || []).forEach(function (_arr) {
    var _rowIndex = _arr[_arr.length - 1];

    if (_isNumber(_rowIndex)) {
      arr.splice(_rowIndex - 1, 0, _arr);
    } else {
      arr.push(_arr);
    }
  });
  return arr.length > 0 ? arr : void 0;
};

var _crSelectProps = function _crSelectProps(items, rootUri, spT) {
  if (rootUri === void 0) {
    rootUri = '';
  }

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
  return {
    selectProps: selectProps
  };
};

var crSelectProps = function crSelectProps(initialProps, dialogProps) {
  if (initialProps === void 0) {
    initialProps = {};
  }

  var _initialProps = initialProps,
      selectProps = _initialProps.selectProps,
      rootUri = _initialProps.rootUri,
      spT = _initialProps.spT,
      _selectItems = _isArr(selectProps) ? _mergeSelectProps(selectProps, dialogProps) : dialogProps.selectProps,
      _rootUri = dialogProps.rootUri || rootUri,
      _spT = dialogProps.spT || spT;

  return _crSelectProps(_selectItems, _rootUri, _spT);
};

var _default = crSelectProps;
exports["default"] = _default;
//# sourceMappingURL=crSelectProps.js.map