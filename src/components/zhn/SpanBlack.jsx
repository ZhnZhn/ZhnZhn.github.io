import { CL_BLACK } from '../styleFn';

const SpanBlack = ({
  style,
  children
}) => (
  <span
    className={CL_BLACK}
    style={style}
  >{children}</span>
);

export default SpanBlack
