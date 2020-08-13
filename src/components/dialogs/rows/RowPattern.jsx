import React from 'react';
//import PropTypes from "prop-types";

import InputPattern from '../../zhn/InputPattern'
import crRow from './crRow'

const RowPattern = React.forwardRef(({
  isShowLabels, caption, captionStyle,
  ...rest
}, ref) => {
    const {
      rowStyle, labelStyle,
      caption:_caption
    } = crRow({ isShowLabels, caption, captionStyle });
    return (
      <div style={rowStyle}>
        <span style={labelStyle}>
           {_caption}
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
