import { forwardRef } from 'react'

import InputSecret from '../zhn/InputSecret'
import STYLE from '../styles/DialogStyles'

const RowSecret = forwardRef(({
  isTitle,
  title,
  titleStyle,
  ...rest
}, ref) => {
  return (
    <form>
      <label style={STYLE.ROW}>
         {isTitle && title &&
           <span style={{...STYLE.CAPTION, ...titleStyle}}>
             {title}
           </span>
         }
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
