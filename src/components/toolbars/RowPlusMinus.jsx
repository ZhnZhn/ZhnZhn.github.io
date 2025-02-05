import {
  SvgPlus,
  SvgMinus
} from '../zhn/BtSvgCircle';
import { SpanBoldBlack } from '../zhn/SpanToken';

const S_CAPTION = {  
  padding: '0 8px 6px 0'
};

const RowPlusMinus = ({
  is,
  styleCaption,
  caption,
  onMinus,
  onPlus
}) => (
  <div>
    <SpanBoldBlack style={{...S_CAPTION, ...styleCaption}}>
       {caption}
    </SpanBoldBlack>
    {
      is ? <SvgMinus onClick={onMinus} />
         : <SvgPlus onClick={onPlus} />
    }
  </div>
);

export default RowPlusMinus
