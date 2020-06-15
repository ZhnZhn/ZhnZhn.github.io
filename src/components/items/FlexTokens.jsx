import React from 'react'

import A from '../Comp'

const S = {
  TOKENS: {
    display: 'flex',
    flexFlow: 'wrap',
    lineHeight: 2
  },
  TOKEN: {
    display: 'inline-block',
    paddingLeft: 8,
    paddingRight: 8,
    fontWeight: 600
  }
}

const FlexSpans = ({ tokens=[] }) => (
  <div style={S.TOKENS}>
    {tokens.map(token => (
      <span key={token} style={S.TOKEN}>
          {token}
      </span>
    ))}
  </div>
);

const FlexTokens = ({ caption, tokens }) => {
  return caption
    ? <A.OpenClose
        caption={caption}
        isClose={false}
      >
        <FlexSpans tokens={tokens}/>
      </A.OpenClose>
    : <FlexSpans tokens={tokens}/>
};

export default FlexTokens
