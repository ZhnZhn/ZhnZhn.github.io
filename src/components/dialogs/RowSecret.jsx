import React, { forwardRef } from 'react'

import InputSecret from '../zhn/InputSecret'
import STYLE from '../styles/DialogStyles'

const RowSecret = forwardRef(({
  title='',
  titleStyle,
  ...rest
}, ref) => {
  return (
    <form>
      <label style={STYLE.ROW}>
         <span style={{...STYLE.CAPTION, ...titleStyle}}>
           {title}
         </span>
         <InputSecret
            ref={ref}
            {...rest}
         />
      </label>
    </form>
  );
})

/*
RowSecret.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object
}
*/

export default RowSecret
