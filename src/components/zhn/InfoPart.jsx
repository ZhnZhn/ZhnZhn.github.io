
import React from 'react';

const _renderText = (text, classText, styleText, isHtml) => {
  return !isHtml
    ? (<span
         className={classText}
         style={styleText}
       >
        {text}
       </span>
      )
   :  (<span
        className={classText}
        style={styleText}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
};

const InfoPart = (props) => {
    const {
            rootStyle,
            caption, styleCaption,
            text, classText,
            styleText, isHtml
          } = props;
    if (!text) { return null; }
    return (
      <div style={rootStyle}>
        { caption &&
          <span style={styleCaption}>
            {caption}
          </span>
        }
        {_renderText(text, classText, styleText, isHtml)}
      </div>
    );
}


export default InfoPart
