import React from 'react';

const ButtonTab = React.createClass({
  propTypes : {
    isShow : React.PropTypes.bool,
    caption : React.PropTypes.string,
    style : React.PropTypes.object,
    onClick : React.PropTypes.func
  },

  getInitialState(){
    return {
      isShow : this.props.isShow
    }
  },

  componentWillReceiveProps(nextProps){
    if ( (nextProps.isShow !== this.state.isShow) ){
      this.setState({isShow : nextProps.isShow})
    }
  },

  _handlerClick(){
    this.props.onClick();
    this.setState({isShow: !this.state.isShow});
  },

  render(){
    const {caption, style, children} = this.props;
    const _rootClass = (this.state.isShow) ?
              'button-tab button-tab--show not-selected' : 'button-tab not-selected';
    return (
      <div
        className={_rootClass}
        style={Object.assign({}, style)}
        onClick={this._handlerClick}
      >
         {caption}
         {children}
      </div>
    );
  }
})

export default ButtonTab
