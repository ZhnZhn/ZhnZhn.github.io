//import PropTypes from "prop-types";
import crCn from '../zhn-utils/crCn';

const CL_SHOW_POPUP = 'show-popup'
, S_SHOW = { display: 'block'}
, S_HIDE = { display: 'none' };

const ShowHide = ({
  isShow,
  className,
  style,
  withoutAnimation,
  animationClass=CL_SHOW_POPUP,
  children
}) => {
    const _cn = crCn(className, [isShow && !withoutAnimation, animationClass])
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
  className: PropTypes.string,
  style: PropTypes.object,
  withoutAnimation: PropTypes.bool,
  animationClass: PropTypes.string,
  children: PropTypes.oneOfType[
    (PropTypes.arrayOf(PropTypes.node), PropTypes.node)
  ]
}
*/

export default ShowHide
