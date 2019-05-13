import React, { useContext } from 'react';

import ThemeContext  from '../hoc/ThemeContext';

import LogoQuandl from './LogoQuandl';
import LogoGitHub from './LogoGitHub';
import LogoReact from './LogoReact';
import LogoHighcharts from './LogoHighcharts';

const TH_ID = 'LOGOS';

const CL = {
 ROOT: 'logo-container',
 LI: 'logo-item',
 LOGO: 'logo-item data-provider-logo'
};

const LOGO_CONFS = [
  {
    caption: 'eurostat',
    title: 'Eurostat',
    href: 'http://ec.europa.eu/eurostat'
  },{
    caption: 'UN Comtrade',
    href: 'https://comtrade.un.org'
  },{
    caption: 'FAOSTAT',
    href: 'http://www.fao.org/faostat/en/#data'
  }
];


const Logo = ({
  className=CL.LOGO,
  title, caption,
  ...rest
}) => (
  <a
    className={className}
    title={title || caption}
    {...rest}
  >
   {caption}
  </a>
);

const LogosBar = () => {
  const theme = useContext(ThemeContext)
  , TS = theme.getStyle(TH_ID);
  return (
    <div className={CL.ROOT} style={TS.ROOT}>
       <LogoQuandl className={CL.LI} />
       <LogoGitHub
         className={CL.LI}
         href="https://github.com/ZhnZhn/ZhnZhn.github.io" />
       <LogoReact className={CL.LI} />
       <LogoHighcharts className={CL.LI} />
       {
         LOGO_CONFS.map(config => (
           <Logo key={config.caption} {...config} />
         ))
       }
    </div>
  );
};

export default LogosBar
