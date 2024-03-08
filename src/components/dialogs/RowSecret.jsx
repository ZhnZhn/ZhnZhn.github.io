import { forwardRef } from '../uiApi';

import InputSecret from '../zhn/InputSecret';
import { SpanInputLabel } from '../zhn/SpanToken';

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
          <SpanInputLabel style={titleStyle}>
            {title}
          </SpanInputLabel>
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
