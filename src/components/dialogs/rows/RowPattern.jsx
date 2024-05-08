import { SpanInputLabel } from '../../zhn/SpanToken';
import InputPattern from '../../zhn/InputPattern';

import crRowLabelStyle from './crRowLabelStyle';
import { RowFlex } from './RowFlex';

const RowPattern = ({
  refEl,
  isShowLabels,
  captionStyle,
  caption,
  ...inputPatternProps
}) => (
  <RowFlex>
    <SpanInputLabel
       style={crRowLabelStyle({
         isShowLabels,
         captionStyle
      })}
    >
       {caption}
    </SpanInputLabel>
    <InputPattern
       refEl={refEl}
       {...inputPatternProps}
    />
  </RowFlex>
);

export default RowPattern
