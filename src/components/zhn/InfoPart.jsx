import DivHtml from './DivHtml';

const S_INLINE = { display: 'inline-block' };

const InfoPart = ({
  style,
  caption,
  captionStyle,
  isHtml,
  text,
  textCn,
  textStyle
}) => {
  if (!text) { return null; }
  return (
    <div style={style}>
      { caption &&
        <span style={captionStyle}>
          {caption+":"}
        </span>
      }
      {
        isHtml ? <DivHtml
            className={textCn}
            style={{...textStyle, ...S_INLINE}}
            str={text}
          />
        : <span
            className={textCn}
            style={textStyle}
          >
            {text}
          </span>
      }
    </div>
  );
}


export default InfoPart
