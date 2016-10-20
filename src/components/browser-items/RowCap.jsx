import React from 'react';

const STYLE = {
  CAP : {
    paddingRight: '8px'
  },
  SALE_PRICE : {
    display: 'display-inline',
    color: 'rgb(47, 126, 216)',
    paddingRight: '8px',
    width: '100px',
    float: 'right'
  },
  IPO : {
    display: 'display-inline',
    color: 'rgb(253, 179, 22)',
    paddingRight: '8px',
    width: '80px',
    float: 'right'
  }
}

const RowCap = ({ cap, salePrice, ipo }) => {
  const _cap = (cap === 0) ? 'n/a' : cap
  return (
    <div>
       <span style={STYLE.CAP}>
         {_cap}
       </span>
       <span style={STYLE.IPO}>
         {`ipo ${ipo}`}
       </span>
       <span style={STYLE.SALE_PRICE}>
         {`on ${salePrice}`}
       </span>
    </div>
  );
};

export default RowCap
