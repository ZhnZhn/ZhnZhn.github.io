import React from 'react';

const styles = {
  rootSpan : {
    display : 'inline-block',
    //color: '#80c040',
    //color : '#2F7ED8',
    //border : '2px solid #2F7ED8',
    borderRadius : '50%',
    width : '22px',
    height : '22px',
    textAlign: 'center',
    fontWeight : 'bold',
    cursor : 'pointer'
  }
}

const ButtonCircle = React.createClass({
  render(){
    const {caption, onClick} = this.props;
    return (
      <span className='button-circle' style={styles.rootSpan} onClick={onClick}>
         {caption}
      </span>
    );
  }
});

export default ButtonCircle
