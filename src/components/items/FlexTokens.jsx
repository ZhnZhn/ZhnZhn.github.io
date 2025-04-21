import {
  S_FLEX,
  S_INLINE
} from '../styleFn';

import ItemStack from '../zhn/ItemStack';
import OpenClose from '../zhn/OpenClose';

const S_TOKENS = {
  ...S_FLEX,
  flexFlow: 'wrap',
  lineHeight: 2
}
, S_TOKEN = {
  ...S_INLINE,
  padding: '0 8px',
  fontWeight: 600,
  whiteSpace: 'nowrap'
};

const _crTokenItem = token => (
  <span key={token} style={S_TOKEN}>
    {token}
  </span>
);

const FlexSpans = ({ tokens }) => (
  <div style={S_TOKENS}>
    <ItemStack
      items={tokens}
      crItem={_crTokenItem}
    />
  </div>
);

const FlexTokens = ({
  caption,
  tokens
}) => {
  return caption
    ? <OpenClose
        isClose={false}
        caption={caption}
      >
        <FlexSpans tokens={tokens}/>
      </OpenClose>
    : <FlexSpans tokens={tokens}/>
};

export default FlexTokens
