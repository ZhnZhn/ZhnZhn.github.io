import OpenClose from '../../zhn/OpenClose';
import InputSelect from '../../zhn-select/InputSelect';
import crRowProps from './crRowProps';

const C_OPEN = "#1b75bb"
, S_OC = {
   paddingTop: 6,
   height: 36
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
