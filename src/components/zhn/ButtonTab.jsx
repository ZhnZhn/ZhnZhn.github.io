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
  render(){
    const {caption, onClick} = this.props;
    return (
      <div
        style={styles.div}
        onClick={onClick}
      >
         {caption}
      </div>
    );
  }
})

export default ButtonTab
