
import React from 'react';

const InfoPart = React.createClass({
  render(){
    const {caption, text, rootStyle, styleCaption} = this.props;
    return (
      <div style={rootStyle}>
        <span style={styleCaption}>
           {caption}
        </span>
        <span>{text}</span>
      </div>
    )
  }
});

export default InfoPart
