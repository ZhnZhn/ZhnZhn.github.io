import {
  CL_TEXT_ELLIPSIS,
  crCn
} from '../styleFn';

const DivEllipsis = (props) => (
  <div
    id={props.id}
    className={crCn(CL_TEXT_ELLIPSIS, props.className)}
    style={props.style}
    title={props.title}
  >
    {props.text}
  </div>
);

export default DivEllipsis
