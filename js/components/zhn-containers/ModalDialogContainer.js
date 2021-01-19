"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useForceUpdate = _interopRequireDefault(require("../hooks/useForceUpdate"));

//import PropTypes from 'prop-types'
var CL = {
  INIT: 'modal-root',
  SHOWING: 'modal-root show-modal',
  HIDING: 'modal-root hide-modal'
};
var STYLE = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_BACKGROUND: {
    backgroundColor: 'rgba(0,0,0, 0)'
  }
};

var ModalDialogContainer = function ModalDialogContainer(_ref) {
  var isShow = _ref.isShow,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 450 : _ref$timeout,
      children = _ref.children,
      onClose = _ref.onClose;

  var _refWasClosing = (0, _react.useRef)(true),
      forceUpdate = (0, _useForceUpdate["default"])();

  (0, _react.useEffect)(function () {
    var current = _refWasClosing.current;

    if (current) {
      setTimeout(forceUpdate, timeout);
    }
  });

  var _className, _style;

  if (_refWasClosing.current) {
    _className = CL.INIT;
    _style = STYLE.HIDE;
    _refWasClosing.current = false;
  } else {
    _className = isShow ? CL.SHOWING : CL.HIDING;
    _style = isShow ? STYLE.SHOW : STYLE.HIDE_BACKGROUND;

    if (!isShow) {
      _refWasClosing.current = true;
    }
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _className,
    style: _style,
    onClick: onClose,
    children: children
  });
};
/*
static propTypes = {
  isShow  : PropTypes.bool,
  timeout : PropTypes.number,
  onClose : PropTypes.func
}
*/

/*
class ModalDialogContainer extends Component {

  static defaultProps = {
    timeout : 450
  }

  wasClosing = true

  componentDidUpdate(prevProps, prevState){
    if (this.wasClosing){
      setTimeout(
        () => { this.setState({}) },
        this.props.timeout
      )
    }
  }

  render(){
    const { isShow, children, onClose } = this.props;
    let _className, _style;
    if (this.wasClosing){
       _className = CL.INIT;
       _style = STYLE.HIDE;
       this.wasClosing = false;
    } else {
      _className = isShow ? CL.SHOWING : CL.HIDING;
      _style = isShow ? STYLE.SHOW : STYLE.HIDE_BACKGROUND;
      if (!isShow){
        this.wasClosing = true;
      }
    }

    return (
      <div className={_className} style={_style} onClick={onClose}>
        {children}
      </div>
    );
  }
}
*/


var _default = ModalDialogContainer;
exports["default"] = _default;
//# sourceMappingURL=ModalDialogContainer.js.map