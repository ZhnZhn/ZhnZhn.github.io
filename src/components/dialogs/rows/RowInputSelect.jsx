import { SpanInputLabel } from  '../../zhn/SpanToken';
import InputSelect from '../../zhn-select/InputSelect';
import crRowProps from './crRowProps';

const RowInputSelect = (props) => {
  const [
    rowStyle,
    labelStyle,
    selectProps,
    caption
  ] = crRowProps(props);

  return (
     <div style={rowStyle}>
        <SpanInputLabel style={labelStyle}>
           {caption}
        </SpanInputLabel>
        <InputSelect {...selectProps} />
    </div>
  );
};


export default RowInputSelect
