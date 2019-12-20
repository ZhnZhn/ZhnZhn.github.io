import React, { useState, useCallback } from 'react'

import A from '../Comp'
import ItemHeader from './ItemHeader'

const S = {
  ROOT: {
    marginBottom: 10
  },
  HEADER: {
    height: 30
  },
  CAPTION: {
    width: 'auto'
  },
  TOKENS: {
    display: 'flex',
    flexFlow: 'wrap',
    lineHeight: 2
  },
  INFO: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  TOKEN: {
    display: 'inline-block',
    paddingLeft: 8,
    paddingRight: 8,
    fontWeight: 600
  },
  DESCR: {
    paddingLeft: 4,
    paddingRight: 4,
    lineHeight: 1.8
  }
};

const FlexSpans = ({ tokens=[] }) => (
  <div style={S.TOKENS}>
    {tokens.map(token => (
      <span key={token} style={S.TOKEN}>
          {token}
      </span>
    ))}
  </div>
);

const Tokens = ({ tokens, tokensName }) => {
  return tokensName
    ? <A.OpenClose
        caption={tokensName}
        isClose={false}
      >
        <FlexSpans tokens={tokens}/>
      </A.OpenClose>
    : <FlexSpans tokens={tokens}/>
};

const Descr = ({
  descrStyle,
  descrName="Decription",
  descr
}) => {
  if (!descr) return null;
  return (
    <A.OpenClose
      caption={descrName}
      isClose={true}
    >
      <div style={{...S.DESCR, ...descrStyle}}>
        {descr}
      </div>
    </A.OpenClose>
  );
};

const FlexTokensItem = (props) => {
  const { config, onCloseItem } = props
  , {
      caption,
      tokens, tokensName,
      descr, descrName, descrStyle
    } = config || {}
  , [isOpen, setIsOpen] = useState(true)
  , _hToggle = useCallback(() => {
      setIsOpen(isOpen => !isOpen)
  }, []);
  return (
    <div style={S.ROOT}>
      <ItemHeader
        isOpen={isOpen}
        rootStyle={S.HEADER}
        captionStyle={S.CAPTION}
        caption={caption}
        onClick={_hToggle}
        onClose={onCloseItem}
      />
      <A.ShowHide isShow={isOpen}>
        <div style={S.INFO}>
          <Tokens
             tokens={tokens}
             tokensName={tokensName}
          />
          <Descr
            descr={descr}
            descrName={descrName}
            descrStyle={descrStyle}
          />
        </div>
      </A.ShowHide>
    </div>
  );
}

export default FlexTokensItem
