import React, { Component } from 'react';
//import PropTypes from 'prop-types'


const CL = {
  INIT : 'modal-root',
  SHOWING : 'modal-root show-modal',
  HIDING : 'modal-root hide-modal'
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

class ModalDialogContainer extends Component {
  /*
  static propTypes = {
    isShow  : PropTypes.bool,
    timeout : PropTypes.number,
    onClose : PropTypes.func
  }
  */
  static defaultProps = {
    timeout : 450
  }

  constructor(props){
    super();
    this.wasClosing = true;
  }

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
    )
  }
}

export default ModalDialogContainer
