import AdapterFn from '../AdapterFn'

const {
  isNumberOrNull,
  ymdToUTC,
} = AdapterFn;

const FRED = 'FRED';

const _crId = (option) => {
   const { value, two, three='' } = option;
   return two
      ? `${value}_${two}_${three}`
      : value;
}
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
  const {
          title='',
          dataSource, linkFn,
        } = option
      , item = _crLinkItem(option)
      , id = _crId(option);
  return {
    id: id, key: id,
    itemCaption: title,
    linkFn, item, dataSource
  };
};

const _crInfo = ({ title='' }) => ({
  name: title
});

const fnAdapter = {
  crSubtitle: ({ subtitle='', threeCaption }) => {
    return threeCaption
      ? `${subtitle}, ${threeCaption}`
      : subtitle;
  },

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


  crConfigOption: (option) => ({
    zhConfig: _crZhConfig(option),
    info: _crInfo(option)
  })

};

export default fnAdapter
