import AdapterFn from '../AdapterFn'

const {
        isNumberOrNull, ymdToUTC,
        valueMoving, crZhFn
      } = AdapterFn;

const FRED = 'FRED';

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
};
const _crZhConfig = (option) => {
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
};

const _crInfo = ({ title='' }) => ({
  name: title
});

const fnAdapter = {
  crData: (json) => {
    const d = [];
    json.data.forEach(p => {
      const { date, value } = p;
      if ( isNumberOrNull(value) ) {
        d.push({
           x: ymdToUTC(date),
           y: value
        });
      }
    })
    return d.reverse();
  },


  crConfigOption: ({ option, data }) => ({
    zhConfig: _crZhConfig(option),
    valueMoving: valueMoving(data),
    info: _crInfo(option),
    ...crZhFn()
  })

};

export default fnAdapter
