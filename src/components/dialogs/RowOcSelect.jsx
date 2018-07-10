import React from 'react';

import OpenClose from '../zhn/OpenClose'
import InputSelect from '../zhn-select/InputSelect';
import STYLE from '../styles/DialogStyles';

const C_OPEN = "#1b75bb";
const S = {
  OC: {
    verticalAlign: 'top',
    paddingTop: 6,
    paddingBottom: 10
  },
  CAPTION: {
    color: C_OPEN
  },
  OPTIONS: {
    width: 250
  }
};

const RowOcSelect = ({
  isShowLabels=true,
  caption='',
  captionStyle,  
  children,
  ...rest
}) => {
  const _caption = caption.indexOf(':') === -1 && caption !== ''
           ? `${caption}:`
           : caption
       , {
           rowStyle, labelStyle
         } = STYLE.crRowOcSelectStyle(isShowLabels)
       , optionName = isShowLabels
            ? ''
            : caption.replace(':', '')
       , _options = { ...S.OPTIONS, ...rest, optionName};
  return (
     <OpenClose
       isClose={true}
       rootStyle={rowStyle}
       ocStyle={{...S.OC, ...labelStyle, ...captionStyle}}
       caption={_caption}
       captionStyle={S.CAPTION}
       openColor={C_OPEN}
       CompAfter={<InputSelect {..._options} />}
     >
      {children}
    </OpenClose>
  );
};

export default RowOcSelect
