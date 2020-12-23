
import AdapterFn from '../AdapterFn'

const { ymdToUTC } = AdapterFn;

const _isArr = Array.isArray;

const _getResults = json => json.BEAAPI.Results
, _getData = Results => _isArr(Results)
    ? Results[0].Data
    : Results.Data
, _getInfo = Results => _isArr(Results)
    ? Results[0]
    : Results;

const _crName = info => {
  const { Statistic='', UTCProductionTime='' } = info
      , t = UTCProductionTime.replace('T', ' ');
  return `${Statistic}: ${t}`;
};
const _crDescr = info => {
  const { Notes=[] } = info
  , arr = Notes.map(note => {
      const { NoteRef='', NoteText='' } = note;
      return `<P>${NoteRef}: ${NoteText}</P><BR/>`;
  });
  return arr.join('');
};
const _crInfo = (Results) => {
  const _info = _getInfo(Results);
  return {
    name: _crName(_info),
    description: _crDescr(_info)
  }
};

const _crZhConfig = (option) => {
  const { value, itemCaption, dataSource } = option;
  return {
    id: value, key: value,
    itemCaption,
    dataSource
  };
};

const _crUTC = (item) => {
  const { Frequency, Year, Quarter } = item;
  let md = '-12-31';
  if (Frequency === 'A') {
    md = '-12-31';
  } else if (Frequency === 'Q') {
    switch(Quarter){
      case 'I': md = '-03-31'; break;
      case 'II': md = '-06-30'; break;
      case 'III': md = '-09-30'; break;
      default: md = '-12-31';
    }
  }
  return ymdToUTC(Year + md);
};

const fnAdapter = {
  crData: (json, option) => {
    const Results = _getResults(json)
    , { dfFilterName, two } = option
    , d = []
    , isFilter = dfFilterName ? true : false
    , data = _getData(Results) || [];

    data.forEach(item => {
      const v = parseFloat(item.DataValue)
          , y = !Number.isNaN(v) ? v : null;
      if ( !(isFilter && item[dfFilterName] !== two) ) {
        d.push({
          x: _crUTC(item),
          y: y
        })
      }
    })

    return d;
  },

  crConfOption: (option, json) => {
    const Results = _getResults(json);
    return {
      zhConfig: _crZhConfig(option),
      info: _crInfo(Results)
    };
  }
};

export default fnAdapter
