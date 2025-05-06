import { IfTrue } from '../uiApi';
import { S_INLINE } from '../styleFn';

import DivHtml from './DivHtml';

const InfoPart = ({
  style,
  caption,
  captionStyle,
  isHtml,
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
      {isHtml ? <DivHtml
         className={textCn}
         style={{...textStyle, ...S_INLINE}}
         str={text}
       /> : <span
         className={textCn}
         style={textStyle}
       >{text}</span>}      
    </div>
  </IfTrue>
);



export default InfoPart
