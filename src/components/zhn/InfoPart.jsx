
import React from 'react';

const InfoPart = React.createClass({
  _renderText(text, classText, styleText, isHtml){
    if (!isHtml){
      return (
        <span
           className={classText}
           style={styleText}
        >
          {text}
        </span>
      )
    } else {
      return (
        <span
           className={classText}
           style={styleText}
           dangerouslySetInnerHTML={{ __html: text }}
        >
        </span>
      )
    }
  },

  render(){
    const {caption, text, classText, rootStyle, styleCaption, styleText, isHtml} = this.props;
    return (
      <div style={rootStyle}>
        <span style={styleCaption}>
           {caption}
        </span>
        {this._renderText(text, classText, styleText, isHtml)}
      </div>
    )
  }
});

export default InfoPart
