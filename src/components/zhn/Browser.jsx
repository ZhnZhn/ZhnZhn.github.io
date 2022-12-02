import useTheme from '../hooks/useTheme';

const TH_ID = 'BROWSER'
, CL_BROWSER = 'browser-container'
, CL_SHOW = 'show-popup'
, S_BLOCK = { display: 'block' }
, S_NONE = { display: 'none' };

const Browser = ({
  isShow,
  style,
  children
}) => {
  const TS = useTheme(TH_ID)
  , [
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
         ...TS.ROOT,
         ..._style,
       }}
    >
       {children}
    </div>
  );
};

export default Browser
