import React, { Component } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

const TH_ID = 'ELEMENT';

class ButtonTab extends Component {
  /*
  static propTypes = {
    style : PropTypes.object,
    isShow : PropTypes.bool,
    notUpdatable : PropTypes.bool
    caption : PropTypes.string,
    onClick : PropTypes.func
  }
  */

  static defaultProps = {
    isUpdatable: true
  }


  constructor(props){
    super(props);
    this.state = {
      isShow: !!props.isShow
    }
  }

  /*
  componentDidUpdate(prevProps){
     if (prevProps !== this.props) {
       const _isShow = !!this.props.isShow;
       if ( _isShow !== this.state.isShow ) {
         this.setState({ isShow: _isShow })
       }
     }
  }
  */


  UNSAFE_componentWillReceiveProps(nextProps){
    if ( nextProps.isUpdatable &&
         this.props !== nextProps) {
        const _isShow = !!nextProps.isShow;
        if ( _isShow !== this.state.isShow) {
          this.setState({ isShow: _isShow })
        }
    }
  }


  _hClick = () => {
    const { isUpdatable, onClick } = this.props
    onClick();
    if (isUpdatable) {
      this.setState(prevState => ({
        isShow: !prevState.isShow
      }));
    }
  }

  render(){
    const {theme, caption, style, children} = this.props
        , TS = theme.getStyle(TH_ID)
        , _rootClass = this.state.isShow
             ? 'button-tab button-tab--show not-selected'
             : 'button-tab not-selected';
    return (
      <div
        className={_rootClass}
        style={{...style, ...TS.BG}}
        onClick={this._hClick}
      >
         {caption}
         {children}
      </div>
    );
  }
}

export default withTheme(ButtonTab)
