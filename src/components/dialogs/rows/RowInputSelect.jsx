import { SpanInputLabel } from  '../../zhn/SpanToken';
import InputSelect from '../../zhn-select/InputSelect';
import crRowProps from './crRowProps';

import crRowLabelStyle from './crRowLabelStyle';
import { RowFlex } from './RowFlex';
import useLabelId from './useLabelId'

const RowInputSelect = (props) => {
  const labelId = useLabelId(props)
  , [
    selectProps,
    caption
  ] = crRowProps(props);

  return (
    <RowFlex>
      <SpanInputLabel
         id={labelId}
         style={crRowLabelStyle(props)}
      >
         {caption}
      </SpanInputLabel>
      <InputSelect
         {...selectProps}
         labelId={labelId}
      />
    </RowFlex>
  );
};


export default RowInputSelect
