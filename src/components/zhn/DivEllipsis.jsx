import {
  CL_TEXT_ELLIPSIS,
  crCn
} from '../styleFn';

const DivEllipsis = ({
  id,
  className,
  style,
  text,
  title
}) => (
  <div
    id={id}
    className={crCn(CL_TEXT_ELLIPSIS, className)}
    style={style}
    title={title}
  >
    {text}
  </div>
);

export default DivEllipsis
