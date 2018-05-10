import React, { Component } from 'react'
//import PropTypes from 'prop-types'

import withTheme from '../hoc/withTheme'

const TH_ID = 'MODAL_PANE';

class ModalPane extends Component {
  /*
  static propTypes = {
    theme: PropTypes.object,

    style: PropTypes.object,
    onClose: PropTypes.func
  }
  */

  static defaultProps = {
    onClose: () => {}
  }
  
  componentWillUpdate(nextProps){
    if (this.props !== nextProps ){
      if (nextProps.isShow){
        document.addEventListener('click', this._hClickOutside, true)
      } else {
        document.removeEventListener('click', this._hClickOutside, true)
      }
    }
  }

  _hClickOutside = (event) => {
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
    const { theme, style, children } = this.props
         , TS = theme.getStyle(TH_ID);
    return (
      <div
         ref={this._refRootNode}
         style={{...style, ...TS.ROOT}}
      >
        {children}
      </div>
    );
  }
}

export default withTheme(ModalPane)
