import { useContext } from 'react';

import ThemeContext  from '../hoc/ThemeContext';

import ItemStack from '../zhn/ItemStack';

import LogoNasdaqDataLink from './LogoNasdaqDataLink';
import LogoGitHub from './LogoGitHub';
import LogoReact from './LogoReact';
import LogoHighcharts from './LogoHighcharts';

const TH_ID = 'LOGOS'

, CL_ROOT = 'logo-container'
, CL_LI = 'logo-item'
, CL_LOGO = 'logo-item data-provider-logo';

const LOGO_CONFS = [
  {
    caption: 'eurostat',
    title: 'Eurostat',
    href: 'https://ec.europa.eu/eurostat'
  },{
    caption: 'UN Comtrade',
    href: 'https://comtrade.un.org'
  },{
    caption: 'FAOSTAT',
    href: 'https://www.fao.org/faostat/en/#data'
  }
];


const Logo = ({
  className=CL_LOGO,
  title,
  caption,
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

const _crLogoItem = config => (
  <Logo key={config.caption} {...config} />
);

const LogosBar = () => {
  const theme = useContext(ThemeContext)
  , TS = theme.getStyle(TH_ID);
  return (
    <div className={CL_ROOT} style={TS.ROOT}>
       <LogoNasdaqDataLink
         className={CL_LI}
       />
       <LogoGitHub
         className={CL_LI}
         href="https://github.com/ZhnZhn/ZhnZhn.github.io" />
       <LogoReact
          className={CL_LI}
        />
       <LogoHighcharts
         className={CL_LI}
       />
       <ItemStack
          items={LOGO_CONFS}
          crItem={_crLogoItem}
        />
    </div>
  );
};

export default LogosBar
