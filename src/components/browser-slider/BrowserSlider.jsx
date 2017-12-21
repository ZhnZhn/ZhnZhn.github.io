import React, { Component } from 'react'

import Browser from '../zhn/Browser';
import BrowserCaption from '../zhn/BrowserCaption';
import ScrollPane from '../zhn/ScrollPane';

import MenuSlider from './MenuSlider'

const S = {
  BROWSER : {
    paddingRight: '0'
  },
  SCROLL_DIV : {
    overflowY: 'auto',
    height: '92%',
    paddingRight: '10px',
    paddingBottom: '4px'
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
      <Browser isShow={isShow} style={S.BROWSER}>
        <BrowserCaption
           caption={caption}
           onClose={this._handleHide}
        />
         <ScrollPane style={S.SCROLL_DIV}>
           <MenuSlider {...this.props} />
         </ScrollPane>
      </Browser>
    );
  }
}

export default BrowserSlider
