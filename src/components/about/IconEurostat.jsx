import React from 'react';

const S = {
  A: {
    marginLeft: '8px'
  }
};

const IconEurostat = () => (
  <a
    className="icon__eurostat"
    title="Eurostat"
    style={S.A}
    href="http://ec.europa.eu/eurostat"
  >
    eurostat
  </a>
);

export default IconEurostat
