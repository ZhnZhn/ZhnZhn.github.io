import React from 'react';

import DialogStyles from '../styles/DialogStyles';
const styles = DialogStyles;

const Row = React.createClass({
  render(){
    const {style, children} = this.props;
    return (
      <div style={Object.assign({},styles.rowDiv, style)}> 
        {children}
      </div>
    )
  }
});

export default Row
