import React from 'react';

import OpenClose from '../../zhn/OpenClose'
import InputSelect from '../../zhn-select/InputSelect'
import useRowOptions from './useRowOptions'

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
   } = useRowOptions(restProps, { isOc: true });

  return (
     <OpenClose
       isClose={true}
       rootStyle={rowStyle}
       ocStyle={{...S.OC, ...labelStyle}}
       caption={caption}
       captionStyle={S.CAPTION}
       openColor={C_OPEN}
       CompAfter={<InputSelect {...options} />}
     >
      {children}
    </OpenClose>
  );
};

export default RowOcSelect
