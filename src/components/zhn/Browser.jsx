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

  return (
    <div
       className={_cn}
       style={{
         ...style,
         ..._style
       }}
       role="presentation"
       onKeyDown={onKeyDown}
    >
       {children}
    </div>
  );
};

export default Browser
