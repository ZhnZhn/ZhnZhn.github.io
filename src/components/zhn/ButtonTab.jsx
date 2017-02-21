import React, { Component, PropTypes } from 'react';

class ButtonTab extends Component {
  static propTypes = {
    isShow : PropTypes.bool,
    caption : PropTypes.string,
    style : PropTypes.object,
    onClick : PropTypes.func
  }

  constructor(props){
    super();
    this.state = {
      isShow : props.isShow
    }
  }

  componentWillReceiveProps(nextProps){
    if ( (nextProps.isShow !== this.state.isShow) ){
      this.setState({isShow : nextProps.isShow})
    }
  }

  _handleClick = () => {
    this.props.onClick();
    this.setState({isShow: !this.state.isShow});
  }

  render(){
    const {caption, style, children} = this.props;
    const _rootClass = (this.state.isShow)
             ? 'button-tab button-tab--show not-selected'
             : 'button-tab not-selected';
    return (
      <div
        className={_rootClass}
        style={Object.assign({}, style)}
        onClick={this._handleClick}
      >
         {caption}
         {children}
      </div>
    );
  }
}

export default ButtonTab
