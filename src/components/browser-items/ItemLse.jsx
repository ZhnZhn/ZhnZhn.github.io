import crCurrencyFormatter from '../../utils/crCurrencyFormatter';

import Item from './Item';

const NA = 'n/a'
    , ML = ' ml';

const S_CAP = { paddingRight: 8 }
, S_COUNTRY = {
  display: 'display-inline',
  color: 'gray',
  width: 35,
  float: 'right'
}
, S_DATE = {
   display: 'display-inline',
   color: 'rgb(253, 179, 22)',
   width: 85,
   float: 'right'
};


const _formatter = crCurrencyFormatter({
  currency: 'GBP',
  minimumFractionDigits: 3
});

const ItemLse = (props) => {
  const { item } = props
  , { cap, c, date } = item || {}
  , _cap = (cap === 0)
      ? NA
      : _formatter.format(cap) + ML;
  return (
    <Item {...props}>
    <div>
       <span style={S_CAP}>
         {_cap}
       </span>
       <span style={S_DATE}>
         {date}
       </span>
       <span style={S_COUNTRY}>
         {c}
       </span>
    </div>
    </Item>
  );
};

export default ItemLse
