import React from 'react';

import IconQuandl from './IconQuandl';
import IconGitHub from './IconGitHub';
import IconReact from './IconReact';
import IconHighcharts from './IconHighcharts';

const STYLE = {
  ROOT : {
    textAlign : 'center',
    paddingTop: '20px'    
  }
}

const IconLogoBar = (props) => {
  return (
    <div style={STYLE.ROOT}>
       <IconQuandl />
       <IconGitHub />
       <IconReact />
       <IconHighcharts />
    </div>
  );
}

export default IconLogoBar
