import React, { Component } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

const TH_ID = 'ELEMENT';

const CL = {
  BT_TAB: 'button-tab not-selected',
  BT_TAB__SHOW: 'button-tab button-tab--show not-selected',
  ARROW: 'arrow-down'
};

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


  _hClick = (evt) => {
    const { isUpdatable, onClick } = this.props;
    onClick(evt);
    if (isUpdatable) {
      this.setState(prevState => ({
        isShow: !prevState.isShow
      }));
    }
  }

  render(){
    const {theme, caption, style, isMenu, children} = this.props
    , TS = theme.getStyle(TH_ID)
    , _rootClass = this.state.isShow
         ? CL.BT_TAB__SHOW
         : CL.BT_TAB;
    return (
      <button
        className={_rootClass}
        style={{...style, ...TS.BG}}
        onClick={this._hClick}
        //tabIndex="-1"
      >
         {caption}
         {isMenu && <span className={CL.ARROW} />}
         {children}
      </button>
    );
  }
}

export default withTheme(ButtonTab)
