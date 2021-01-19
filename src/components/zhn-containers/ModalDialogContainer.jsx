import { useRef, useEffect } from 'react';
//import PropTypes from 'prop-types'
import useForceUpdate from '../hooks/useForceUpdate'

const CL = {
  INIT: 'modal-root',
  SHOWING: 'modal-root show-modal',
  HIDING: 'modal-root hide-modal'
};

const STYLE = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_BACKGROUND: {
    backgroundColor: 'rgba(0,0,0, 0)'
  }
}

const ModalDialogContainer = ({
  isShow,
  timeout=450,
  children,
  onClose
}) => {
  const _refWasClosing = useRef(true)
  , forceUpdate = useForceUpdate();

  useEffect(() => {
    const { current } = _refWasClosing;
    if (current) {
      setTimeout(forceUpdate, timeout)
    }
  })

  let _className, _style;
  if (_refWasClosing.current){
     _className = CL.INIT;
     _style = STYLE.HIDE;
     _refWasClosing.current = false;
  } else {
    _className = isShow ? CL.SHOWING : CL.HIDING;
    _style = isShow ? STYLE.SHOW : STYLE.HIDE_BACKGROUND;
    if (!isShow){
      _refWasClosing.current = true;
    }
  }

  return (
    <div
      className={_className}
      style={_style}
      onClick={onClose}
    >
      {children}
    </div>
  );
}

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

export default ModalDialogContainer
