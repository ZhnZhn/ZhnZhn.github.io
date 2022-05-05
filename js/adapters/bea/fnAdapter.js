"use strict";

exports.__esModule = true;
exports.joinBy = exports.crError = exports.crData = exports.crConfOption = void 0;

var _AdapterFn = require("../AdapterFn");

exports.joinBy = _AdapterFn.joinBy;

var _crFn = require("../crFn");

exports.crError = _crFn.crError;

const _isArr = Array.isArray,
      _getResults = json => json.BEAAPI.Results,
      _getData = Results => _isArr(Results) ? Results[0].Data : Results.Data,
      _getInfo = Results => _isArr(Results) ? Results[0] : Results;

const _crName = info => {
  const {
    Statistic = '',
    UTCProductionTime = ''
  } = info,
        t = UTCProductionTime.replace('T', ' ');
  return Statistic + ": " + t;
};

const _crDescr = info => {
  const {
    Notes = []
  } = info,
        arr = Notes.map(note => {
    const {
      NoteRef = '',
      NoteText = ''
    } = note;
    return "<P>" + NoteRef + ": " + NoteText + "</P><BR/>";
  });
  return arr.join('');
};

const _crInfo = Results => {
  const _info = _getInfo(Results);

  return {
    name: _crName(_info),
    description: _crDescr(_info)
  };
};

const _crZhConfig = _ref => {
  let {
    _itemKey,
    itemCaption,
    dataSource
  } = _ref;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption,
    dataSource
  };
};

const MD = {
  DF: '-12-31',
  'I': '-03-31',
  'II': '-06-30',
  'III': '-09-30'
};

const _crUTC = item => {
  const {
    Frequency,
    Year,
    Quarter
  } = item,
        md = Frequency === 'Q' ? MD[Quarter] || MD.DF : MD.DF;
  return (0, _AdapterFn.ymdToUTC)(Year + md);
};

const crData = (json, option) => {
  const Results = _getResults(json),
        {
    dfFilterName,
    items
  } = option,
        two = (items[1] || {}).value,
        d = [],
        isFilter = dfFilterName ? true : false,
        data = _getData(Results) || [];

  data.forEach(item => {
    const v = parseFloat(item.DataValue),
          y = (0, _AdapterFn._isNaN)(v) ? null : v;

    if (!(isFilter && item[dfFilterName] !== two)) {
      d.push({
        x: _crUTC(item),
        y: y
      });
    }
  });
  return d;
};

exports.crData = crData;

const crConfOption = (option, json) => {
  const Results = _getResults(json);

  return {
    zhConfig: _crZhConfig(option),
    info: _crInfo(Results)
  };
};

exports.crConfOption = crConfOption;
//# sourceMappingURL=fnAdapter.js.map