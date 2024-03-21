import { CL_OPEN_CLOSE } from '../../styleFn';
import { CL_SP_INPUT_LABEL } from '../../zhn/SpanToken';

import OpenClose from '../../zhn/OpenClose';
import InputSelect from '../../zhn-select/InputSelect';
import crRowProps from './crRowProps';

import crRowLabelStyle from './crRowLabelStyle';
import { S_ROW_FLEX } from './RowFlex';
import useLabelId from './useLabelId';

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
  const labelId = useLabelId(restProps)
  , [
     selectProps,
     caption
  ] = crRowProps(restProps)
  , _ocStyle = {
     ...S_OC,
     ...crRowLabelStyle(restProps),
     ...restProps.labelStyle
  };

  return (
     <OpenClose
       labelId={labelId}
       caption={caption}
       style={S_OPEN_CLOSE}
       rowStyle={S_ROW_FLEX}
       className={CL_OPEN_CLOSE_INPUT_LABEL}
       ocStyle={_ocStyle}
       captionStyle={S_CAPTION}
       openColor={C_OPEN}
       CompAfter={(
         <InputSelect
            {...selectProps}
            labelId={labelId}
         />
       )}
     >
      {children}
    </OpenClose>
  );
};

export default RowOcSelect
