import AdapterFn from '../AdapterFn'

const FRED = 'FRED';

const _isNumberOrNull = v =>
   (typeof v === 'number' && !isNaN(v))
   || v === null;

const _crId = (value, two) =>
   two ? `${value}_${two}` : value;

const _crLinkItem= (option) => {
  const { linkFn, value='' } = option;
  if ( linkFn === FRED ){
    return {
      id: value.replace('$', ''),
      article: option.dfArticle
    };
  }
  return value;
}

const fnAdapter = {
  crData: (json) => {
    const d = [];
    json.data.forEach(p => {
      const { date, value } = p;
      if ( _isNumberOrNull(value) ) {
        d.push({
           x: AdapterFn.ymdToUTC(date),
           y: value
        });
      }
    })
    return d.reverse();
  },

  crZhConfig: (option) => {
    const { value, title='', dataSource, linkFn, two } = option
        , item = _crLinkItem(option)
        , id = _crId(value, two);
    return {
      id: id, key: id,
      itemCaption: title,
      isWithoutAdd: true,
      isWithLegend: false,
      linkFn, item, dataSource
    };
  },
  crValueMoving: (d) => {
    return AdapterFn.valueMoving(d);
  },
  crInfo: (option) => {
    const { title } = option;
    return {
      name: title
    };
  }

};

export default fnAdapter
