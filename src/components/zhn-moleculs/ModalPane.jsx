import React, { Component } from 'react'

import withTheme from '../hoc/withTheme'

const TH_ID = 'MODAL_PANE';

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
    if (
        this.rootNode &&
        this.rootNode.contains &&
        !this.rootNode.contains(event.target)
    ){
      this.props.onClose(event)
    }
  }

  _refRootNode = n => this.rootNode = n

  render(){
    const { theme, children } = this.props
         , TS = theme.getStyle(TH_ID);
    return (
      <div ref={this._refRootNode} style={TS.ROOT}>
        {children}
      </div>
    );
  }
}

export default withTheme(ModalPane)
