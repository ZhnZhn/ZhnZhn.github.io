import React, { Component } from 'react'
//import PropTypes from 'prop-types'

import withTheme from '../hoc/withTheme'

const TH_ID = 'MODAL_PANE';

class ModalPane extends Component {
  /*
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    theme: PropTypes.object,
    isShow: PropTypes.bool,
    onClose: PropTypes.func
  }
  */

  static defaultProps = {
    onClose: () => {}
  }

  _hClickOutside = (event) => {
    if (this.rootNode
      && this.rootNode.contains
      && !this.rootNode.contains(event.target)
    ){
      this.props.onClose(event)
    }
  }

  _addOutsideListener = () => {
    document.addEventListener('click', this._hClickOutside, true)
  }
  _removeOutsideListener = () => {
    document.removeEventListener('click', this._hClickOutside, true)
  }

  componentDidMount() {
    if (this.props.isShow) {
      this._addOutsideListener()
    }
  }
  componentWillUnmount() {
    this._removeOutsideListener()
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps ){
      if (this.props.isShow){
        this._addOutsideListener()
      } else {
        this._removeOutsideListener()
      }
    }
  }

  /*
  componentWillUpdate(nextProps){
    if (this.props !== nextProps ){
      if (nextProps.isShow){
        document.addEventListener('click', this._hClickOutside, true)
      } else {
        document.removeEventListener('click', this._hClickOutside, true)
      }
    }
  }
  */
  
  _refRootNode = n => this.rootNode = n

  render(){
    const {
      theme,
      style,
      children
    } = this.props
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
