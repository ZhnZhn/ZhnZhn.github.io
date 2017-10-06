"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objToArrItems = function _objToArrItems(obj) {
  var keys = Object.keys(obj).sort();
  var arr = [];
  keys.forEach(function (key) {
    arr.push({
      caption: key,
      value: obj[key]
    });
  });
  return arr;
};

var AlphaSectorAdapter = {
  toConfig: function toConfig(json, option) {
    var _dataKeys = Object.keys(json).sort(),
        ranks = [];
    _dataKeys.forEach(function (key) {
      if (key !== "Meta Data") {
        var _arr = key.split(":"),
            _key = _arr[1] ? _arr[1] : 'Empty Name';
        ranks.push({
          caption: _key,
          items: _objToArrItems(json[key])
        });
      }
    });

    var config = {
      ranks: ranks,
      zhCompType: "SECTOR",
      zhConfig: {
        dataSource: "Alpha",
        id: "SECTOR_ID",
        isWithLegend: false,
        key: "SECTOR_ID"
      }
    };
    return { config: config };
  },
  toSeries: function toSeries(json, option) {
    throw new Error('ZH_1000');
  }
};

exports.default = AlphaSectorAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\alpha\AlphaSectorAdapter.js.map