import {
  SvgPlus,
  SvgMinus
} from '../zhn/BtSvgCircle';
import SpanBlack from '../zhn/SpanBlack';

const S_CAPTION = {
  display: 'inline-block',
  padding: '0 8px 6px 0',
  fontWeight: 'bold'
};

const RowPlusMinus = ({
  is,
  styleCaption,
  caption,
  onMinus,
  onPlus
}) => (
  <div>
    <SpanBlack style={{...S_CAPTION, ...styleCaption}}>
       {caption}
    </SpanBlack>
    {
      is ? <SvgMinus onClick={onMinus} />
         : <SvgPlus onClick={onPlus} />
    }
  </div>
);

export default RowPlusMinus
