'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FRED = 'FRED';

var _isNumberOrNull = function _isNumberOrNull(v) {
  return typeof v === 'number' && !isNaN(v) || v === null;
};

var _crId = function _crId(value, two) {
  return two ? value + '_' + two : value;
};

var _crLinkItem = function _crLinkItem(option) {
  var linkFn = option.linkFn,
      _option$value = option.value,
      value = _option$value === undefined ? '' : _option$value;

  if (linkFn === FRED) {
    return {
      id: value.replace('$', ''),
      article: option.dfArticle
    };
  }
  return value;
};

var fnAdapter = {
  crData: function crData(json) {
    var d = [];
    json.data.forEach(function (p) {
      var date = p.date,
          value = p.value;

      if (_isNumberOrNull(value)) {
        d.push({
          x: _AdapterFn2.default.ymdToUTC(date),
          y: value
        });
      }
    });
    return d.reverse();
  },

  crZhConfig: function crZhConfig(option) {
    var value = option.value,
        _option$title = option.title,
        title = _option$title === undefined ? '' : _option$title,
        dataSource = option.dataSource,
        linkFn = option.linkFn,
        two = option.two,
        item = _crLinkItem(option),
        id = _crId(value, two);

    return {
      id: id, key: id,
      itemCaption: title,
      isWithoutAdd: true,
      isWithLegend: false,
      linkFn: linkFn, item: item, dataSource: dataSource
    };
  },
  crValueMoving: function crValueMoving(d) {
    return _AdapterFn2.default.valueMoving(d);
  },
  crInfo: function crInfo(option) {
    var title = option.title;

    return {
      name: title
    };
  }

};

exports.default = fnAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\intrinio\fnAdapter.js.map