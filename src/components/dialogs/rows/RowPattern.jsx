import { forwardRef } from 'react';
//import PropTypes from "prop-types";

import InputPattern from '../../zhn/InputPattern'
import crRowStyle from './crRowStyle'

const RowPattern = forwardRef(({
  isShowLabels,
  captionStyle,
  caption,
  ...rest
}, ref) => {
    const {
      rowStyle, labelStyle,
    } = crRowStyle({ isShowLabels, captionStyle });
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

/*
RowPattern.propTypes = {
   isShowLabels: PropTypes.bool,
   caption : PropTypes.string
   captionStyle: PropTypes.object
}
*/

export default RowPattern
