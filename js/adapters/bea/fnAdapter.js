"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var ymdToUTC = _AdapterFn["default"].ymdToUTC;
var _isArr = Array.isArray;

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

var _crZhConfig = function _crZhConfig(option) {
  var value = option.value,
      itemCaption = option.itemCaption,
      dataSource = option.dataSource;
  return {
    id: value,
    key: value,
    itemCaption: itemCaption,
    dataSource: dataSource
  };
};

var _crUTC = function _crUTC(item) {
  var Frequency = item.Frequency,
      Year = item.Year,
      Quarter = item.Quarter;
  var md = '-12-31';

  if (Frequency === 'A') {
    md = '-12-31';
  } else if (Frequency === 'Q') {
    switch (Quarter) {
      case 'I':
        md = '-03-31';
        break;

      case 'II':
        md = '-06-30';
        break;

      case 'III':
        md = '-09-30';
        break;

      default:
        md = '-12-31';
    }
  }

  return ymdToUTC(Year + md);
};

var fnAdapter = {
  crData: function crData(json, option) {
    var Results = _getResults(json),
        dfFilterName = option.dfFilterName,
        two = option.two,
        d = [],
        isFilter = dfFilterName ? true : false,
        data = _getData(Results) || [];

    data.forEach(function (item) {
      var v = parseFloat(item.DataValue),
          y = !Number.isNaN(v) ? v : null;

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