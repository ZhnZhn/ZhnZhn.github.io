'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conf = require('./conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crBlackSpan = function _crBlackSpan(text) {
  return text ? '<span style=\'color:black;\'>' + text + '</span>' : '';
};
var _crWrSpan = function _crWrSpan(text) {
  return text ? '<span style=\'display:inline-block;width:75px;text-align:right;\'>' + text + '</span>' : '';
};

var _crDescrRow = function _crDescrRow(title, value) {
  var code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var _codeText = code ? ' (Code: ' + code + ')' : '';
  return value ? '<div>' + _crWrSpan(title + ':') + ' ' + _crBlackSpan(value) + _codeText + '</div>' : '';
};

var fnDescr = {
  toDescr: function toDescr(item) {
    var _item$Area = item.Area,
        Area = _item$Area === undefined ? '' : _item$Area,
        _item$Domain = item.Domain,
        Domain = _item$Domain === undefined ? '' : _item$Domain,
        _item$Item = item.Item,
        Item = _item$Item === undefined ? '' : _item$Item,
        _item$Element = item.Element,
        Element = _item$Element === undefined ? '' : _item$Element,
        _item$Unit = item.Unit,
        Unit = _item$Unit === undefined ? '' : _item$Unit,
        _unit = Unit ? Unit[0].toUpperCase() + Unit.substr(1) : '';

    return '<div>\n      ' + _crDescrRow('Area', Area, item['Area Code']) + '\n      ' + _crDescrRow('Domain', Domain, item['Domain Code']) + '\n      ' + _crDescrRow('Item', Item, item['Item Code']) + '\n      ' + _crDescrRow('Element', Element, item['Element Code']) + '\n      ' + _crDescrRow('Unit', _unit) + '\n      <div>' + (item['Flag Description'] || _conf2.default.DATASET_EMPTY) + '</div>\n    </div>';
  },

  toInfo: function toInfo(json, title, subtitle) {
    var _json$data = json.data,
        data = _json$data === undefined ? [] : _json$data,
        _itemNewest = data[data.length - 1] || {},
        _itemOldest = data[0] || {},
        _dateNewest = _itemNewest.Year || '',
        _dateOldest = _itemOldest.Year || '',
        _descr = this.toDescr(_itemNewest);

    return {
      description: _descr,
      frequency: "Annual",
      name: title + ': ' + subtitle,
      newest_available_date: _dateNewest,
      oldest_available_date: _dateOldest
    };
  }
};

exports.default = fnDescr;
//# sourceMappingURL=fnDescr.js.map