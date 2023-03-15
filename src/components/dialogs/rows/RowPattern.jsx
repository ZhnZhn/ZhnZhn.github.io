import { forwardRef } from '../../uiApi';

import { crRowLabelStyle } from '../../styles/DialogStyles';
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
        <span style={labelStyle}>
           {caption}
        </span>
        <InputPattern
           ref={ref}
           {...rest}
        />
     </div>
    )
})

export default RowPattern
