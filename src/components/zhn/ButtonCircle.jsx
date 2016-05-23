import React from 'react';

const styles = {
  rootSpan : {
    display : 'inline-block',
    color: '#80c040',
    border : '2px solid #80c040',
    borderRadius : '50%',
    width : '22px',
    height : '22px',
    textAlign: 'center',
    cursor: 'pointer'
  }
}

const ButtonCircle = React.createClass({
  render(){
    const {caption, style, onClick} = this.props;
    return (
      <span
         style={Object.assign({}, styles.rootSpan, style)}
         onClick={onClick}
      >
         {caption}
      </span>
    );
  }
});

export default ButtonCircle
