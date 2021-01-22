"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var ymdToUTC = _AdapterFn["default"].ymdToUTC;
var _isArr = Array.isArray,
    _isNaN = Number.isNaN;

var _getResults = function _getResults(json) {
  return json.BEAAPI.Results;
},
    _getData = function _getData(Results) {
  return _isArr(Results) ? Results[0].Data : Results.Data;
},
    _getInfo = function _getInfo(Results) {
  return _isArr(Results) ? Results[0] : Results;
};

var _crName = function _crName(info) {
  var _info$Statistic = info.Statistic,
      Statistic = _info$Statistic === void 0 ? '' : _info$Statistic,
      _info$UTCProductionTi = info.UTCProductionTime,
      UTCProductionTime = _info$UTCProductionTi === void 0 ? '' : _info$UTCProductionTi,
      t = UTCProductionTime.replace('T', ' ');
  return Statistic + ": " + t;
};

var _crDescr = function _crDescr(info) {
  var _info$Notes = info.Notes,
      Notes = _info$Notes === void 0 ? [] : _info$Notes,
      arr = Notes.map(function (note) {
    var _note$NoteRef = note.NoteRef,
        NoteRef = _note$NoteRef === void 0 ? '' : _note$NoteRef,
        _note$NoteText = note.NoteText,
        NoteText = _note$NoteText === void 0 ? '' : _note$NoteText;
    return "<P>" + NoteRef + ": " + NoteText + "</P><BR/>";
  });
  return arr.join('');
};

var _crInfo = function _crInfo(Results) {
  var _info = _getInfo(Results);

  return {
    name: _crName(_info),
    description: _crDescr(_info)
  };
};

var _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    dataSource: dataSource
  };
};

var MD = {
  DF: '-12-31',
  'I': '-03-31',
  'II': '-06-30',
  'III': '-09-30'
};

var _crUTC = function _crUTC(item) {
  var Frequency = item.Frequency,
      Year = item.Year,
      Quarter = item.Quarter,
      md = Frequency === 'Q' ? MD[Quarter] || MD.DF : MD.DF;
  return ymdToUTC(Year + md);
};

var fnAdapter = {
  crData: function crData(json, option) {
    var Results = _getResults(json),
        dfFilterName = option.dfFilterName,
        items = option.items,
        two = (items[1] || {}).value,
        d = [],
        isFilter = dfFilterName ? true : false,
        data = _getData(Results) || [];

    data.forEach(function (item) {
      var v = parseFloat(item.DataValue),
          y = _isNaN(v) ? null : v;

      if (!(isFilter && item[dfFilterName] !== two)) {
        d.push({
          x: _crUTC(item),
          y: y
        });
      }
    });
    return d;
  },
  crConfOption: function crConfOption(option, json) {
    var Results = _getResults(json);

    return {
      zhConfig: _crZhConfig(option),
      info: _crInfo(Results)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map