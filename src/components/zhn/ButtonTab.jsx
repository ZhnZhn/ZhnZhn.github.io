import React, { Component } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

const TH_ID = 'ELEMENT';

class ButtonTab extends Component {
  /*
  static propTypes = {
    style : PropTypes.object,
    isShow : PropTypes.bool,
    caption : PropTypes.string,
    onClick : PropTypes.func
  }
  */

  constructor(props){
    super();
    this.state = {
      isShow : props.isShow
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if ( this.props !== nextProps &&
         nextProps.isShow !== this.state.isShow )
    {
      this.setState({ isShow : nextProps.isShow })
    }
  }

  _handleClick = () => {
    this.props.onClick();
    this.setState({isShow: !this.state.isShow});
  }

  render(){
    const {theme, caption, style, children} = this.props
        , TS = theme.getStyle(TH_ID)
        , _rootClass = (this.state.isShow)
             ? 'button-tab button-tab--show not-selected'
             : 'button-tab not-selected';
    return (
      <div
        className={_rootClass}
        style={{...style, ...TS.BG}}
        onClick={this._handleClick}
      >
         {caption}
         {children}
      </div>
    );
  }
}

export default withTheme(ButtonTab)
