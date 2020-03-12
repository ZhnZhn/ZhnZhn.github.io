import React, { Component } from 'react'

import A from '../Comp'

import MenuSlider from './MenuSlider'

const CL_SCROLL = 'scroll-container-y';

const S = {
  BROWSER: {
    paddingRight: '0'
  },
  SCROLL_DIV: {
    height: '92%'
  }
};

class BrowserSlider extends Component {
  constructor(props){
    super();
    this.state = {
      isShow: props.isInitShow ? true : false,
    }
  }

  componentDidMount(){
    this.unsubscribe = this.props.store.listen(this._onStore)
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state.isShow === nextState.isShow){
      return false;
    }
    return true;
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  _onStore = (actionType, data) => {
    const { browserType, showAction  } = this.props;
    if (actionType === showAction && data === browserType){
      this._handleShow();
    }
  }

  _handleHide = () => {
    this.setState({ isShow : false });
  }
  _handleShow = () => {
    this.setState({ isShow : true });
  }

  render(){
    const { caption } = this.props
        , { isShow } = this.state;
    return (
      <A.Browser isShow={isShow} style={S.BROWSER}>
        <A.BrowserCaption
           caption={caption}
           onClose={this._handleHide}
        />
         <A.ScrollPane
           className={CL_SCROLL}
           style={S.SCROLL_DIV}
         >
           <MenuSlider {...this.props} />
         </A.ScrollPane>
      </A.Browser>
    );
  }
}

export default BrowserSlider
