//import PropTypes from "prop-types";
import crCn from '../zhn-utils/crCn';

const CL_SHOW_POPUP = 'show-popup'
, S_SHOW = { display: 'block'}
, S_HIDE = { display: 'none' };

const ShowHide = ({
  isShow,
  withoutAnimation,
  className, style,
  children
}) => {
    const _cn = crCn(className, [isShow && !withoutAnimation, CL_SHOW_POPUP])
    , _styleShow = isShow ? S_SHOW : S_HIDE;

    return (
      <div
        aria-expanded={isShow}
        className={_cn}
        style={{...style, ..._styleShow}}
      >
        {children}
      </div>
    );
 };

/*
ShowHide.propTypes = {
  isShow: PropTypes.bool,
  withoutAnimation: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType[
    (PropTypes.arrayOf(PropTypes.node), PropTypes.node)
  ]
}
*/

export default ShowHide
