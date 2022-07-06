//import PropTypes from "prop-types";

import useTheme from '../hooks/useTheme';
import crCn from '../zhn-utils/crCn';

const TH_ID = 'ELEMENT';

const CL_BT_TAB = 'not-selected bt-tab'
, CL_BT_TAB__SHOW = `${CL_BT_TAB} bt-tab--show`
, CL_ARROW_DOWN = 'arrow-down';

const ButtonTab = ({
  is=true,
  isShow,
  isMenu,
  className,
  style,
  caption,
  onClick
}) => {
  const TS = useTheme(TH_ID)

  if (!is) { return null; }

  const _cn = crCn(
    isShow ? CL_BT_TAB__SHOW : CL_BT_TAB,
    className
  );

  return (
    <button
      className={_cn}
      style={{...style, ...TS.BG}}
      onClick={onClick}
    >
       {caption}
       {isMenu && <span className={CL_ARROW_DOWN} />}
    </button>
  );
};

export default ButtonTab
