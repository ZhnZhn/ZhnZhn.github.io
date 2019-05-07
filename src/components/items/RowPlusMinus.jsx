import React from 'react';

import SvgPlus from '../zhn/SvgPlus';
import SvgMinus from '../zhn/SvgMinus';

const S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    paddingRight: 8,
    paddingBottom: 6,
    fontWeight: 'bold'
  }
};

const RowPlusMinus = ({ is, caption, onMinus, onPlus }) => (
  <div>
    <span style={S.CAPTION}>
       {caption}
    </span>
    {
      is ? <SvgMinus onClick={onMinus} />
         : <SvgPlus onClick={onPlus} />
    }
  </div>
);

export default RowPlusMinus
