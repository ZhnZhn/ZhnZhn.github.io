import { CL_OPEN_CLOSE } from '../../zhn/OpenCloseStyle';
import { CL_SP_INPUT_LABEL } from '../../zhn/SpanToken';

import OpenClose from '../../zhn/OpenClose';
import InputSelect from '../../zhn-select/InputSelect';
import crRowProps from './crRowProps';

const C_OPEN = "#1b75bb"
, CL_OPEN_CLOSE_INPUT_LABEL = `${CL_OPEN_CLOSE} ${CL_SP_INPUT_LABEL}`
, S_OC = {
   height: 36,
   paddingTop: 6,
   width: 100
}
, S_OPEN_CLOSE = {
  lineHeight: 'unset'
}
, S_CAPTION = {
  color: C_OPEN
};

const RowOcSelect = ({
  children,
  ...restProps
}) => {
  const [
     rowStyle,
     labelStyle,
     selectProps,
     caption
  ] = crRowProps(restProps)
  , _ocStyle = {
     ...S_OC,
     ...labelStyle,
     ...restProps.labelStyle
  };

  return (
     <OpenClose
       caption={caption}
       style={S_OPEN_CLOSE}
       rowStyle={rowStyle}
       className={CL_OPEN_CLOSE_INPUT_LABEL}
       ocStyle={_ocStyle}
       captionStyle={S_CAPTION}
       openColor={C_OPEN}
       CompAfter={<InputSelect {...selectProps} />}
     >
      {children}
    </OpenClose>
  );
};

export default RowOcSelect
