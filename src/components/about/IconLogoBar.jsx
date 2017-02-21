import React from 'react';

import IconQuandl from './IconQuandl';
import IconGitHub from './IconGitHub';
import IconReact from './IconReact';
import IconHighcharts from './IconHighcharts';
import IconEurostat from './IconEurostat';

const S = {
  ROOT : {
    textAlign : 'center',
    paddingTop: '20px'
  }
}

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
  </div>
);

export default IconLogoBar
