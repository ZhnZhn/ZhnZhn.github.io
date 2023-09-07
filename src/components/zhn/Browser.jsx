import { crBsContainerCn } from '../styleFn';

const CL_BROWSER = crBsContainerCn('browser-container')
, CL_SHOW = 'show-popup'
, S_BLOCK = { display: 'block' }
, S_NONE = { display: 'none' };

const Browser = ({
  isShow,
  style,
  children
}) => {
  const [
    _cn,
    _style
  ] = isShow
    ? [`${CL_BROWSER} ${CL_SHOW}`, S_BLOCK]
    : [CL_BROWSER, S_NONE];

  return (
    <div
       className={_cn}
       style={{
         ...style,
         ..._style,
       }}
    >
       {children}
    </div>
  );
};

export default Browser
