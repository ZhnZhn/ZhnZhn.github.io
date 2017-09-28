import React from 'react'

const S = {
  A: {
    marginTop: '8px',
    marginRight: '16px'
  }
};

const IconFaoStat = () => (
  <a
    className="icon__eurostat"
    style={S.A}
    title="FAOSTAT"
    href="http://www.fao.org/faostat/en/#data"
  >
    FAOSTAT
  </a>
);

export default IconFaoStat
