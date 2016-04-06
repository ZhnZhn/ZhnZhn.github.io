import React from 'react';

const styles = {
  step : {
    display : 'inline-block',
    color: '#80c040',
    border : '2px solid #80c040',
    borderRadius : '50%',
    width : '22px',
    height : '22px',
    textAlign: 'center'
  }
}

const Step = React.createClass({
  render(){
    return (
      <span style={styles.step}>
         {this.props.step}
      </span>
    );
  }
});

export default Step
