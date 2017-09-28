import React from 'react'

const S = {
  A: {
    marginTop: '8px',
    marginLeft: '16px',
    marginRight: '16px'
  }
};

const IconUnComtrade = () => (
  <a
    className="icon__eurostat"
    style={S.A}
    title="UN Comtrade"
    href="https://comtrade.un.org"
  >
    UN Comtrade
  </a>
);

export default IconUnComtrade
