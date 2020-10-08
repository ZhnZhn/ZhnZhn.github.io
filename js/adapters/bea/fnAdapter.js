"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var crId = _AdapterFn["default"].crId,
    ymdToUTC = _AdapterFn["default"].ymdToUTC;

var _crName = function _crName(Results) {
  var _Results$Statistic = Results.Statistic,
      Statistic = _Results$Statistic === void 0 ? '' : _Results$Statistic,
      _Results$UTCProductio = Results.UTCProductionTime,
      UTCProductionTime = _Results$UTCProductio === void 0 ? '' : _Results$UTCProductio,
      t = UTCProductionTime.replace('T', ' ');
  return Statistic + ": " + t;
};

var _crDescr = function _crDescr(Results) {
  var _Results$Notes = Results.Notes,
      Notes = _Results$Notes === void 0 ? [] : _Results$Notes,
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
  return {
    name: _crName(Results),
    description: _crDescr(Results)
  };
};

var _crZhConfig = function _crZhConfig(option) {
  var itemCaption = option.itemCaption,
      dataSource = option.dataSource,
      id = crId();
  return {
    id: id,
    key: id,
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

var _isArr = Array.isArray;

var _getData = function _getData(Results) {
  return _isArr(Results) ? Results[0].Data : Results.Data;
};

var fnAdapter = {
  crData: function crData(Results, option) {
    var dfFilterName = option.dfFilterName,
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
  crConfigOption: function crConfigOption(Results, option) {
    return {
      zhConfig: _crZhConfig(option),
      info: _crInfo(Results)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map