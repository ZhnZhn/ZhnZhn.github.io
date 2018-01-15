import React from 'react';

import IconQuandl from './IconQuandl';
import IconGitHub from './IconGitHub';
import IconReact from './IconReact';
import IconHighcharts from './IconHighcharts';
import IconEurostat from './IconEurostat';
import IconUnComtrade from './IconUnComtrade';
import IconFaoStat from './IconFaoStat';
import IconIntrinio from './IconIntrinio';

const S = {
  ROOT : {
    textAlign : 'center',
    paddingTop: '20px',
    paddingBottom: '8px'
  }
};

const IconLogoBar = (props) => (
  <div style={S.ROOT}>
     <IconQuandl />
     <IconGitHub
        className="icon__github"
        title="GitHub ERC"
        uri="https://github.com/ZhnZhn/ZhnZhn.github.io"
     />
     <IconReact />
     <IconHighcharts />
     <IconEurostat />
     <IconUnComtrade />
     <IconFaoStat />
     <IconIntrinio />
  </div>
);

export default IconLogoBar
