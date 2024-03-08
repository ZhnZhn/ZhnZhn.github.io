import { forwardRef } from '../../uiApi';

import { crRowLabelStyle } from '../../styles/DialogStyles';
import { SpanInputLabel } from '../../zhn/SpanToken';
import InputPattern from '../../zhn/InputPattern';

const RowPattern = forwardRef(({
  isShowLabels,
  captionStyle,
  caption,
  ...rest
}, ref) => {
    const [
      rowStyle,
      labelStyle,
    ] = crRowLabelStyle(
      isShowLabels,
      captionStyle
    );
    return (
      <div style={rowStyle}>
        <SpanInputLabel style={labelStyle}>
           {caption}
        </SpanInputLabel>
        <InputPattern
           ref={ref}
           {...rest}
        />
     </div>
    )
})

export default RowPattern
