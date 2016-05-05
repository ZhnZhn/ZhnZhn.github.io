import React from 'react';

const ButtonTab = React.createClass({
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
    const {caption, style} = this.props;
    const _rootClass = (this.state.isShow) ?
              'button-tab button-tab--show' : 'button-tab';
    return (
      <div
        className={_rootClass}
        style={Object.assign({}, style)}
        onClick={this._handlerClick}
      >
         {caption}
      </div>
    );
  }
})

export default ButtonTab
