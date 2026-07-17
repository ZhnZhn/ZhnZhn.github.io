import { IfTrue } from '../uiApi';
import { S_INLINE } from '../styleFn';

const InfoPart = ({
  style,
  caption,
  captionStyle,
  text,
  textCn,
  textStyle
}) => (
  <IfTrue v={text}>
    <div style={style}>
      <IfTrue v={caption}>
        <span style={captionStyle}>
          {caption+":"}
        </span>
      </IfTrue>
      <span
        className={textCn}
        style={textStyle}
      >
        {text}
      </span>
    </div>
  </IfTrue>
);



export default InfoPart
