import React from 'react';


const ClassNames = {
  INIT : 'modal-root',
  SHOWING : 'modal-root show-modal',
  HIDING : 'modal-root hide-modal'
};

const Styles = {
  SHOW : {
    display : 'block'
  },
  HIDE : {
    display : 'none'
  },
  HIDE_BACKGROUND : {
    backgroundColor : 'rgba(0,0,0, 0)'
  }
}

const ModalDialogContainer = React.createClass({
  propTypes : {
    isShow  : React.PropTypes.bool,
    timeout : React.PropTypes.number,
    onClose : React.PropTypes.func
  },
  getDefaultProps(){
    return {
      timeout : 450
    }
  },
  getInitialState(){
    this.wasClosing = true;
    return {}
  },

  componentDidUpdate(prevProps, prevState){
    if (this.wasClosing){
      setTimeout(()=>{
        this.setState({});
      }, this.props.timeout)
    }
  },

  render(){
    const {isShow, children, onClose} = this.props;
    let _className, _style;
    if (this.wasClosing){
       _className = ClassNames.INIT;
       _style = Styles.HIDE;
       this.wasClosing = false;
    } else {
      _className = isShow ? ClassNames.SHOWING : ClassNames.HIDING;
      _style = isShow ? Styles.SHOW : Styles.HIDE_BACKGROUND;
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

});

export default ModalDialogContainer
