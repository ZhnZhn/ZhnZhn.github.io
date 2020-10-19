//import PropTypes from "prop-types";
import useTheme from '../hooks/useTheme'

const TH_ID = 'BROWSER';

const CL = {
  BROWSER: 'browser-container',
  SHOW: 'show-popup'
};
const S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

const Browser = ({ isShow, style, children }) => {
  const TS = useTheme(TH_ID)
  , _styleOpen = isShow ? S.BLOCK : S.NONE
  , _clOpen = isShow ? CL.SHOW : ''
  , _clRoot = `${CL.BROWSER} ${_clOpen}`;
  return (
    <div
       className={_clRoot}
       style={{
         ...style, ..._styleOpen,
         ...TS.ROOT
       }}
     >
       {children}
    </div>
  );
}

/*
Browser.propTypes = {
  isShow: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.node
}
*/

export default Browser
