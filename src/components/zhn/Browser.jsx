import {
  crPresentationRole
} from '../a11yFn';
import {
  crBsContainerCn,
  crShowHide
} from '../styleFn';

const CL_BROWSER = crBsContainerCn('browser-container');

const Browser = (props) => {
  const [
    _cn,
    _style
  ] = crShowHide(
    props.isShow,
    CL_BROWSER
  );

 /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return (
    <div
       {...crPresentationRole(props.isShow)}
       className={_cn}
       style={{
         ...props.style,
         ..._style
       }}
       onKeyDown={props.onKeyDown}
    >
       {props.children}
    </div>
  );
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};

export default Browser
