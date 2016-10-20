import React from 'react';
import accounting from 'accounting';

const NA = 'n/a';

const STYLE = {
  CAP : {
    paddingRight: '8px'
  },
  SALE_PRICE : {
    display: 'display-inline',
    color: 'rgb(47, 126, 216)',
    paddingRight: '8px',
    width: '90px',
    float: 'right'
  },
  IPO : {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    //paddingRight: '8px',
    width: '70px',
    float: 'right'
  }
}

const RowCap = ({ cap, salePrice, ipo }) => {
  const _cap = (cap === 0)
           ? NA
           : accounting.formatMoney(cap)
      , _salePrice = (cap !== NA && cap !== 0)
           ? accounting.formatMoney(salePrice)
           : NA
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
