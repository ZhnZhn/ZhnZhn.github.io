import {
  SvgPlus,
  SvgMinus
} from '../zhn/BtSvgCircle';
import { SpanBlack } from '../zhn/SpanToken';

import { S_INLINE_BLOCK_BOLD } from './Row.Style';

const S_CAPTION = {
  ...S_INLINE_BLOCK_BOLD,
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
