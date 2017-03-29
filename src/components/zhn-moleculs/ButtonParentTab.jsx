import React, { Component, PropTypes } from 'react';

import ShowHide from '../zhn/ShowHide'

const STYLE = {
  SHOW_HIDE : {
    position: 'absolute', top: '0px', left: '0px'
  }
}

class ButtonParentTab extends Component {
  static propTypes = {
    style : PropTypes.object,
    isShow : PropTypes.bool,
    caption : PropTypes.string,
    children : PropTypes.element,
  }

  constructor(props){
    super();
    this.state = {
      isShow : !!props.isShow
    }
  }

  componentWillReceiveProps(nextProps){
    if ( (nextProps.isShow !== this.state.isShow) ){
      this.setState({ isShow : nextProps.isShow })
    }
  }

  _handleClick = () => {
    this.setState({ isShow: !this.state.isShow });
  }

  render(){
    const {caption, style, children} = this.props
        , { isShow } = this.state
        , _rootClass = (isShow)
             ? 'button-tab button-tab--show not-selected'
             : 'button-tab not-selected';
    return (
      <div
        className={_rootClass}
        style={Object.assign({}, STYLE.ROOT, style)}
      >
         <div onClick={this._handleClick}>
           <span>{caption}</span>
           <span className="arrow-down"></span>
         </div>
         <ShowHide
            style={STYLE.SHOW_HIDE}
            isShow={isShow}
         >
           {children}
        </ShowHide>
      </div>
    );
  }
}

export default ButtonParentTab
