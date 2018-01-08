'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crName = function _crName(Results) {
  var _Results$Statistic = Results.Statistic,
      Statistic = _Results$Statistic === undefined ? '' : _Results$Statistic,
      _Results$UTCProductio = Results.UTCProductionTime,
      UTCProductionTime = _Results$UTCProductio === undefined ? '' : _Results$UTCProductio,
      t = UTCProductionTime.replace('T', ' ');

  return Statistic + ': ' + t;
};
var _crDescr = function _crDescr(Results) {
  var _Results$Notes = Results.Notes,
      Notes = _Results$Notes === undefined ? [] : _Results$Notes,
      arr = Notes.map(function (note) {
    var _note$NoteRef = note.NoteRef,
        NoteRef = _note$NoteRef === undefined ? '' : _note$NoteRef,
        _note$NoteText = note.NoteText,
        NoteText = _note$NoteText === undefined ? '' : _note$NoteText;

    return '<P>' + NoteRef + ': ' + NoteText + '</P><BR/>';
  });

  return arr.join('');
};

var fnAdapter = {
  crUTC: function crUTC(item) {
    var Frequency = item.Frequency,
        Year = item.Year,
        Quarter = item.Quarter;

    var md = '-12-31';
    if (Frequency === 'A') {
      md = '-12-31';
    } else if (Frequency === 'Q') {
      switch (Quarter) {
        case 'I':
          md = '-03-31';break;
        case 'II':
          md = '-06-30';break;
        case 'III':
          md = '-09-30';break;
        default:
          md = '-12-31';
      }
    }
    return _AdapterFn2.default.ymdToUTC(Year + md);
  },

  crValueMoving: function crValueMoving(d) {
    return _AdapterFn2.default.valueMoving(d);
  },

  crInfo: function crInfo(Results) {
    return {
      name: _crName(Results),
      description: _crDescr(Results)
    };
  },

  crZhConfig: function crZhConfig(option) {
    var title = option.title,
        dataSource = option.dataSource,
        id = _AdapterFn2.default.crId();

    return {
      id: id, key: id,
      itemCaption: title,
      isWithoutAdd: true,
      isWithLegend: false,
      dataSource: dataSource
    };
  }

};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map