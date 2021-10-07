import crCurrencyFormatter from '../../utils/crCurrencyFormatter'

const NA = 'n/a';

const S_CAP = { paddingRight: 8 }
, S_SALE_PRICE = {
   display: 'display-inline',
   color: '#2f7ed8',
   paddingRight: 8,
   width: 90,
   float: 'right'
}
, S_IPO = {
   display: 'display-inline',
   color: '#fdb316',
   width: 70,
   float: 'right'
};

const _capFormatter = crCurrencyFormatter({
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
const _formatter = crCurrencyFormatter();

const RowCap = ({
  cap,
  salePrice,
  ipo
}) => {
  const _cap = (cap === 0)
       ? NA
       : _capFormatter.format(cap)
  , _salePrice = (cap !== NA && cap !== 0)
       ? _formatter.format(salePrice)
       : NA;
  return (
    <div>
       <span style={S_CAP}>
         {_cap}
       </span>
       <span style={S_IPO}>
         {`ipo ${ipo}`}
       </span>
       <span style={S_SALE_PRICE}>
         {_salePrice}
       </span>
    </div>
  );
};

export default RowCap
