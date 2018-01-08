
import AdapterFn from '../AdapterFn'

const _crName = (Results) => {
  const { Statistic='', UTCProductionTime='' } = Results
      , t = UTCProductionTime.replace('T', ' ');
  return `${Statistic}: ${t}`;
}
const _crDescr = (Results) => {
  const { Notes=[] } = Results
      , arr = Notes.map(note => {
          const { NoteRef='', NoteText='' } = note;
          return `<P>${NoteRef}: ${NoteText}</P><BR/>`;
        });
  return arr.join('');
}

const fnAdapter = {
  crUTC: (item) => {
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
    return AdapterFn.ymdToUTC(Year + md);
  },

  crValueMoving: (d) => {
    return AdapterFn.valueMoving(d);
  },

  crInfo: (Results) => {
    return {
      name: _crName(Results),
      description: _crDescr(Results)
    }
  },

  crZhConfig: (option) => {
    const { title, dataSource } = option
         , id = AdapterFn.crId();
    return {
      id, key: id,
      itemCaption: title,
      isWithoutAdd: true,
      isWithLegend: false,
      dataSource
    };
  }

}

export default fnAdapter
