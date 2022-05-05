"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

const DATASET_EMPTY = "Dataset is empty";

const _crBlackSpan = text => text ? "<span style='color:black;'>" + text + "</span>" : '';

const _crWrSpan = text => text ? "<span style='display:inline-block;width:75px;text-align:right;'>" + text + "</span>" : '';

const _crDescrRow = function (title, value, code) {
  if (code === void 0) {
    code = '';
  }

  const _codeText = code ? " (Code: " + code + ")" : '';

  return value ? "<div>" + _crWrSpan(title + ':') + " " + _crBlackSpan(value) + _codeText + "</div>" : '';
};

const _toDescr = (item, title) => {
  const _isList = title.indexOf('> (List)') !== -1,
        {
    Area = '',
    Domain = '',
    Item = '',
    Element = '',
    Unit
  } = item,
        _areaDescrRow = _isList ? '' : _crDescrRow('Area', Area, item['Area Code']),
        _Unit = (0, _AdapterFn.toUpperCaseFirst)(Unit);

  return "<div>\n    " + _areaDescrRow + "\n    " + _crDescrRow('Domain', Domain, item['Domain Code']) + "\n    " + _crDescrRow('Item', Item, item['Item Code']) + "\n    " + _crDescrRow('Element', Element, item['Element Code']) + "\n    " + _crDescrRow('Unit', _Unit) + "\n    <div>" + (item['Flag Description'] || DATASET_EMPTY) + "</div>\n  </div>";
};

const fnDescr = {
  toInfo(json, title, subtitle) {
    const {
      data
    } = json,
          _itemNewest = data[data.length - 1] || {},
          _itemOldest = data[0] || {},
          _dateNewest = _itemNewest.Year || '',
          _dateOldest = _itemOldest.Year || '',
          _descr = _toDescr(_itemNewest, title);

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
exports.default = _default;
//# sourceMappingURL=fnDescr.js.map