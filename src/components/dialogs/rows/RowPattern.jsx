import { forwardRef } from '../../uiApi';

import { SpanInputLabel } from '../../zhn/SpanToken';
import InputPattern from '../../zhn/InputPattern';

import crRowLabelStyle from './crRowLabelStyle';
import { RowFlex } from './RowFlex';

const RowPattern = forwardRef(({
  isShowLabels,
  captionStyle,
  caption,
  ...inputPatternProps
}, ref) => (
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
       ref={ref}
       {...inputPatternProps}
    />
  </RowFlex>
))

export default RowPattern
