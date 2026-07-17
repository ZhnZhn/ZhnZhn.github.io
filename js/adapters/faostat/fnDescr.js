"use strict";

exports.__esModule = true;
exports.toInfo = exports.DATASET_EMPTY = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _strFn = require("../../utils/strFn");
const DATASET_EMPTY = exports.DATASET_EMPTY = "Dataset is empty";
const _crDescrRow = (title, value, code) => {
  const _codeText = code ? ` (Code: ${code})` : '';
  return value ? `${title}: ${value}${_codeText}` : '';
};
const _toDescr = (item, title) => [
//_isList case
title.indexOf('> (List)') !== -1 ? '' : _crDescrRow('Area', item.Area, item['Area Code']), _crDescrRow('Domain', item.Domain, item['Domain Code']), _crDescrRow('Item', item.Item, item['Item Code']), _crDescrRow('Element', item.Element, item['Element Code']), _crDescrRow('Unit', (0, _strFn.toUpperCaseFirst)(item.Unit)), item['Flag Description'] || DATASET_EMPTY];
const _getItemYear = item => (0, _isTypeFn.isObj)(item) ? item.Year : '';
const toInfo = (json, title, subtitle) => {
  const {
      data
    } = json,
    _itemNewest = data[data.length - 1];
  return {
    name: `${title}: ${subtitle}`,
    frequency: "Annual",
    toDate: _getItemYear(_itemNewest),
    fromDate: _getItemYear(data[0]),
    descr: (0, _isTypeFn.isObj)(_itemNewest) ? _toDescr(_itemNewest, title) : void 0
  };
};
exports.toInfo = toInfo;
//# sourceMappingURL=fnDescr.js.map