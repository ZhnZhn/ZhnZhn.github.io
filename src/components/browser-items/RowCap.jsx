import React from 'react';

import crCurrencyFormatter from '../../utils/crCurrencyFormatter'

const NA = 'n/a';

const STYLE = {
  CAP : {
    paddingRight: 8
  },
  SALE_PRICE : {
    display: 'display-inline',
    color: 'rgb(47, 126, 216)',
    paddingRight: 8,
    width: 90,
    float: 'right'
  },
  IPO : {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    width: 70,
    float: 'right'
  }
}

const _capFormatter = crCurrencyFormatter({
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
const _formatter = crCurrencyFormatter();

const RowCap = ({ cap, salePrice, ipo }) => {
  const _cap = (cap === 0)
           ? NA
           : _capFormatter.format(cap)
      , _salePrice = (cap !== NA && cap !== 0)
           ? _formatter.format(salePrice)
           : NA;
  return (
    <div>
       <span style={STYLE.CAP}>
         {_cap}
       </span>
       <span style={STYLE.IPO}>
         {`ipo ${ipo}`}
       </span>
       <span style={STYLE.SALE_PRICE}>
         {_salePrice}
       </span>
    </div>
  );
};

export default RowCap
