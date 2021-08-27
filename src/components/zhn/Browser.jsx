//import PropTypes from "prop-types";

import useTheme from '../hooks/useTheme';
import crCn from '../zhn-utils/crCn';

const TH_ID = 'BROWSER';

const CL_BROWSER = 'browser-container'
, CL_SHOW = 'show-popup'
, S_BLOCK = { display: 'block' }
, S_NONE = { display: 'none' };

const Browser = ({
  isShow,
  style,
  children
}) => {
  const TS = useTheme(TH_ID)
  , _cn = crCn(CL_BROWSER, [isShow, CL_SHOW])
  , _style = isShow ? S_BLOCK : S_NONE;

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

/*
Browser.propTypes = {
  isShow: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
}
*/

export default Browser
