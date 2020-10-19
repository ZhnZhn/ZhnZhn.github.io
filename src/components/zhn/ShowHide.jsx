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
  withoutAnimation=false,
  className, style,
  children
}) => {
    const _styleShow = isShow ? S.SHOW : S.HIDE
    , _classShow = isShow
         ? withoutAnimation ? '' : CL_SHOW_POPUP
         : ''
    , _className = className
        ? `${className} ${_classShow}`
        : _classShow || void 0;
    return (
      <div
        aria-expanded={isShow}
        className={_className}
        style={{ ...style, ..._styleShow}}
      >
        {children}
      </div>
    );
 }

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
