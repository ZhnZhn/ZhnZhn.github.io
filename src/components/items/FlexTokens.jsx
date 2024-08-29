import A from '../zhn/A';

const S_TOKENS = {
  display: 'flex',
  flexFlow: 'wrap',
  lineHeight: 2
}
, S_TOKEN = {
   display: 'inline-block',
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
    <A.ItemStack
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
    ? <A.OpenClose
        isClose={false}
        caption={caption}
      >
        <FlexSpans tokens={tokens}/>
      </A.OpenClose>
    : <FlexSpans tokens={tokens}/>
};

export default FlexTokens
