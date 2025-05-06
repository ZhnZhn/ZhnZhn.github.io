import {
  crCn,
  crWithScrollCn
} from '../styleFn';

const CL_SCROLL = crWithScrollCn();

const ScrollPane = (props) => (
  <div
    ref={props.refEl}
    className={crCn(CL_SCROLL, props.className)}
    style={props.style}
  >
     {props.children}
  </div>
);

export default ScrollPane
