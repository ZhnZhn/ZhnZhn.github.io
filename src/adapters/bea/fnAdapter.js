
import AdapterFn from '../AdapterFn'

const {
  crId,
  ymdToUTC
} = AdapterFn;

const _crName = (Results) => {
  const { Statistic='', UTCProductionTime='' } = Results
      , t = UTCProductionTime.replace('T', ' ');
  return `${Statistic}: ${t}`;
};
const _crDescr = (Results) => {
  const { Notes=[] } = Results
      , arr = Notes.map(note => {
          const { NoteRef='', NoteText='' } = note;
          return `<P>${NoteRef}: ${NoteText}</P><BR/>`;
        });
  return arr.join('');
};
const _crInfo = (Results) => ({
  name: _crName(Results),
  description: _crDescr(Results)
});

const _crZhConfig = (option) => {
  const { itemCaption, dataSource } = option
       , id = crId();
  return {
    id, key: id,
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
  crData: (Results, option) => {
    const { dfFilterName, two } = option
        , d = []
        , isFilter = dfFilterName ? true : false;

    Results.Data.forEach(item => {
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

  crConfigOption: (Results, option) => ({
    zhConfig: _crZhConfig(option),
    info: _crInfo(Results)
  })

}

export default fnAdapter
