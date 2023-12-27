import {
  crPresentationRole
} from '../a11yFn';
import {
  crBsContainerCn,
  crShowHide
} from '../styleFn';

const CL_BROWSER = crBsContainerCn('browser-container');

const Browser = ({
  isShow,
  style,
  onKeyDown,
  children
}) => {
  const [
    _cn,
    _style
  ] = crShowHide(isShow, CL_BROWSER);

 /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return (
    <div
       {...crPresentationRole(isShow)}
       className={_cn}
       style={{
         ...style,
         ..._style
       }}
       onKeyDown={onKeyDown}
    >
       {children}
    </div>
  );
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};

export default Browser
