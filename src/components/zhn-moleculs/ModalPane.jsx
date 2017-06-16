import React, { Component } from 'react'

class ModalPane extends Component {
  static defaultProps = {
    onClose: () => {}
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps ){
      if (nextProps.isShow){
        document.addEventListener('click', this._handleClickOutside, true)
      } else {
        document.removeEventListener('click', this._handleClickOutside, true)
      }
    }
  }

  _handleClickOutside = (event) => {
    if (!this.rootNode.contains(event.target)){
      this.props.onClose(event)
    }
  }

  render(){
    const { children } = this.props;
    return (
      <div ref={n => this.rootNode = n}>
        {children}
      </div>
    );
  }
}

export default ModalPane
