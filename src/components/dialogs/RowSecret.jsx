import { forwardRef } from '../uiApi';

import InputSecret from '../zhn/InputSecret';
import { S_DIALOG_CAPTION } from '../styles/DialogStyles';

const S_LABEL = {
  display: 'flex',
  margin: '5px 0'
};

const RowSecret = forwardRef(({
  isTitle,
  title,
  titleStyle,
  ...rest
}, ref) => (
  <form>
    <label style={S_LABEL}>
       {isTitle && title &&
         <span style={{...S_DIALOG_CAPTION, ...titleStyle}}>
           {title}
         </span>
       }
       <InputSecret
          ref={ref}
          {...rest}
       />
    </label>
  </form>
));


/*
RowSecret.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object
}
*/

export default RowSecret
