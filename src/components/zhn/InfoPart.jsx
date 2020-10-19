import DivHtml from './DivHtml'

const S = {
  INLINE: {
    display: 'inline-block'
  }
};

const InfoPart = (props) => {
    const {
      style,
      caption, styleCaption,
      isHtml, text, classText, styleText
    } = props;
    if (!text) { return null; }
    return (
      <div style={style}>
        { caption &&
          <span style={styleCaption}>
            {caption+":"}
          </span>
        }
        {
          isHtml ? <DivHtml
              className={classText}
              style={{...styleText, ...S.INLINE}}
              str={text}
            />
          : <span
              className={classText}
              style={styleText}
            >
              {text}
            </span>
        }
      </div>
    );
}


export default InfoPart
