import React from 'react';

const styles = {
  div : {
    position : 'absolute',
    zIndex : 10,
    top : 0,
    left : '300px',
    backgroundColor : '#232F3B',
    color : 'rgba(164, 135, 212, 1)',
    paddingLeft : '6px',
    paddingRight : '6px',
    paddingTop : '3px',
    paddingBottom : '3px',
    borderBottomLeftRadius : '8px',
    borderBottomRightRadius : '8px',
    cursor : 'pointer'
  }
}

const ButtonTab = React.createClass({
  getInitialState(){
    return {
      isShow : this.props.isShow
    }
  },

  _handlerClick(){
    this.props.onClick();
    this.setState({isShow: !this.state.isShow});    
  },

  render(){
    const {caption, style} = this.props;
    const _divStyle = (this.state.isShow) ? undefined : {color: 'gray'};
    return (
      <div
        style={Object.assign({}, styles.div, style, _divStyle)}
        onClick={this._handlerClick}
      >
         {caption}
      </div>
    );
  }
})

export default ButtonTab
