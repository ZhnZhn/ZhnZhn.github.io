import React from 'react';

const AppLabel = React.createClass({
  render(){
    const {style, title, caption} = this.props;
    return (
      <span style={style} title={title}>
        {caption}
      </span>
    )
  }
});

export default AppLabel
