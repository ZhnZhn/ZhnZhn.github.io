"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var toUpperCaseFirst = _AdapterFn["default"].toUpperCaseFirst;
var DATASET_EMPTY = "Dataset is empty";

var _crBlackSpan = function _crBlackSpan(text) {
  return text ? "<span style='color:black;'>" + text + "</span>" : '';
};

var _crWrSpan = function _crWrSpan(text) {
  return text ? "<span style='display:inline-block;width:75px;text-align:right;'>" + text + "</span>" : '';
};

var _crDescrRow = function _crDescrRow(title, value, code) {
  if (code === void 0) {
    code = '';
  }

  var _codeText = code ? " (Code: " + code + ")" : '';

  return value ? "<div>" + _crWrSpan(title + ':') + " " + _crBlackSpan(value) + _codeText + "</div>" : '';
};

var _toDescr = function _toDescr(item) {
  var _item$Area = item.Area,
      Area = _item$Area === void 0 ? '' : _item$Area,
      _item$Domain = item.Domain,
      Domain = _item$Domain === void 0 ? '' : _item$Domain,
      _item$Item = item.Item,
      Item = _item$Item === void 0 ? '' : _item$Item,
      _item$Element = item.Element,
      Element = _item$Element === void 0 ? '' : _item$Element,
      Unit = item.Unit,
      _Unit = toUpperCaseFirst(Unit);

  return "<div>\n    " + _crDescrRow('Area', Area, item['Area Code']) + "\n    " + _crDescrRow('Domain', Domain, item['Domain Code']) + "\n    " + _crDescrRow('Item', Item, item['Item Code']) + "\n    " + _crDescrRow('Element', Element, item['Element Code']) + "\n    " + _crDescrRow('Unit', _Unit) + "\n    <div>" + (item['Flag Description'] || DATASET_EMPTY) + "</div>\n  </div>";
};

var fnDescr = {
  toInfo: function toInfo(json, title, subtitle) {
    var _json$data = json.data,
        data = _json$data === void 0 ? [] : _json$data,
        _itemNewest = data[data.length - 1] || {},
        _itemOldest = data[0] || {},
        _dateNewest = _itemNewest.Year || '',
        _dateOldest = _itemOldest.Year || '',
        _descr = _toDescr(_itemNewest);

    return {
      description: _descr,
      frequency: "Annual",
      name: title + ': ' + subtitle,
      toDate: _dateNewest,
      fromDate: _dateOldest
    };
  }
};
var _default = fnDescr;
exports["default"] = _default;
//# sourceMappingURL=fnDescr.js.map