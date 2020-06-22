import React from 'react';

import OpenClose from '../../zhn/OpenClose'
import InputSelect from '../../zhn-select/InputSelect'
import crRowOptions from './crRowOptions'

const C_OPEN = "#1b75bb";
const S = {
  OC: {
    verticalAlign: 'top',
    paddingTop: 6,
    paddingBottom: 10
  },
  CAPTION: {
    color: C_OPEN
  }
};

const RowOcSelect = ({
  children,
  ...restProps
}) => {
   const {
     rowStyle, labelStyle, caption,
     options
   } = crRowOptions(restProps, { isOc: true });

  return (
     <OpenClose
       caption={caption}
       style={rowStyle}
       ocStyle={{...S.OC, ...labelStyle}}
       captionStyle={S.CAPTION}
       openColor={C_OPEN}
       CompAfter={<InputSelect {...options} />}
     >
      {children}
    </OpenClose>
  );
};

export default RowOcSelect
