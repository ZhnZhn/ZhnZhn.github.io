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
    const {caption, className, style, isWithoutDefault, onClick} = this.props
        , _className = (className) ? className + ' not-selected' : 'not-selected'
        , _style = (isWithoutDefault) ? style : Object.assign({}, styles.rootSpan, style);
    return (
      <span
         className={_className}
         style={_style}
         onClick={onClick}
      >
         {caption}
      </span>
    );
  }
});

export default ButtonCircle
