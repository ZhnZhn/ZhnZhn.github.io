import { S_FLEX } from '../styleFn';

import InputSecret from '../zhn/InputSecret';
import { SpanInputLabel } from '../zhn/SpanToken';

const S_LABEL = {
  ...S_FLEX,
  margin: '5px 0'
};

const RowSecret = ({
  refEl,
  isTitle,
  title,
  titleStyle,
  ...rest
}) => (
  <form>
    <label style={S_LABEL}>
       {isTitle && title &&
          <SpanInputLabel style={titleStyle}>
            {title}
          </SpanInputLabel>
       }
       <InputSecret
          refEl={refEl}
          {...rest}
       />
    </label>
  </form>
);


/*
RowSecret.propTypes = {
  refEl: PropTypes.ref,
  title: PropTypes.string,
  titleStyle: PropTypes.object
}
*/

export default RowSecret
