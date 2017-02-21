
import React from 'react';

const _renderText = (text, classText, styleText, isHtml) => {
  if (!isHtml){
    return (
      <span
         className={classText}
         style={styleText}
      >
        {text}
      </span>
    );
  } else {
    return (
      <span
         className={classText}
         style={styleText}
         dangerouslySetInnerHTML={{ __html: text }}
      >
      </span>
    );
  }
}

const InfoPart = (props) => {
    const {
            caption, text, classText,
            rootStyle, styleCaption, styleText, isHtml
          } = props;
    return (
      <div style={rootStyle}>
        <span style={styleCaption}>
           {caption}
        </span>
        {_renderText(text, classText, styleText, isHtml)}
      </div>
    );
}

export default InfoPart
