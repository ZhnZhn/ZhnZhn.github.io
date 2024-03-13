import { SpanInputLabel } from  '../../zhn/SpanToken';
import InputSelect from '../../zhn-select/InputSelect';
import crRowProps from './crRowProps';

import crRowLabelStyle from './crRowLabelStyle';
import { RowFlex } from './RowFlex';

const RowInputSelect = (props) => {
  const [
    selectProps,
    caption
  ] = crRowProps(props);

  return (
    <RowFlex>
      <SpanInputLabel style={crRowLabelStyle(props)}>
         {caption}
      </SpanInputLabel>
      <InputSelect {...selectProps} />
    </RowFlex>
  );
};


export default RowInputSelect
