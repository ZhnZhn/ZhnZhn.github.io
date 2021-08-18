import crCn from '../zhn-utils/crCn';

//import PropTypes from "prop-types";

const CL_SHOW_POPUP = 'show-popup';
const S = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  }
};

const ShowHide = ({
  isShow,
  withoutAnimation,
  className, style,
  children
}) => {
    const _cn = crCn(className, [isShow && !withoutAnimation, CL_SHOW_POPUP])
    , _styleShow = isShow ? S.SHOW : S.HIDE;

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
