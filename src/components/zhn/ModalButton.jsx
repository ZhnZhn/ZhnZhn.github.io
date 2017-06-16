import React, { Component } from 'react'

class ModalButton extends Component {

  componentDidMount(){
    const { onReg } = this.props;
    if (typeof onReg === 'function'){
      onReg(this.rootNode)
    }
  }

  render(){
    const {
            type, style, title, caption,
            children, onClick
          } = this.props;
    let _className;
    switch (type) {
      case 'TypeA': _className = 'button-type-a'; break;
      case 'TypeC': _className = 'button-type-c'; break;
      default     : _className = 'button-type-b';
    }

    return (
      <button
           ref={n => this.rootNode = n}
           className={_className}
           style={style}
           title={title}
           onClick={onClick}
       >
         {caption}
         {children}
      </button>
    );
  }
}

export default ModalButton
