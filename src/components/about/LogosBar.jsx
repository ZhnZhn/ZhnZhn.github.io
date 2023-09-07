import ItemStack from '../zhn/ItemStack';
import LinkSvgLogo from './LinkSvgLogo';
import LinkLogo from './LinkLogo';

const CL_ROOT = 'logo-container'
, LOGO_SVG_PROPS = {
  fillRule: "evenodd",
  clipRule: "evenodd",
  strokeLinejoin: "round",
  strokeMiterlimit: "1.414"
};

const LINK_SVG_LOGO_CONFS = [
  [
    'Nasdaq Data Link',
    'logo-ndl',
    'https://data.nasdaq.com',
    'NDLSemi',
    {w: '215', h: '36'}
  ],[
    'GitHub Repository',
    'logo-github',
    'https://github.com/ZhnZhn/ZhnZhn.github.io',
    'GitHub',
    {...LOGO_SVG_PROPS, w: '16'}
  ],[
    'React',
    'logo-react',
    'https://reactjs.org',
    'React',
    {...LOGO_SVG_PROPS, w: '600'}
  ],[
    'Highcharts',
    'logo-highcharts',
    'https://www.highcharts.com',
    'Highcharts',
    {...LOGO_SVG_PROPS, w: '425.197', h: '141.732'}
  ]
]
, LINK_LOGO_CONFS = [
  [
    'https://ec.europa.eu/eurostat',
    'eurostat',
    'Eurostat'
  ],[
    'https://comtrade.un.org',
    'UN Comtrade'
  ],[
    'https://www.fao.org/faostat/en/#data',
    'FAOSTAT'
  ]
];

const _crLinkSvgLogo = ([
  ariaLabel,
  className,
  href,
  id,
  svgProps
]) => (
  <LinkSvgLogo
    key={id}
    ariaLabel={ariaLabel}
    className={className}
    href={href}
    id={id}
    svgProps={svgProps}
  />
);

const _crLinkLogo = ([
  href,
  caption,
  ariaLabel
]) => (
  <LinkLogo
    key={caption}
    href={href}
    caption={caption}
    ariaLabel={ariaLabel}
  />
);

const LogosBar = () => (
  <div className={CL_ROOT} >
     <ItemStack
       items={LINK_SVG_LOGO_CONFS}
       crItem={_crLinkSvgLogo}
     />
     <ItemStack
       items={LINK_LOGO_CONFS}
       crItem={_crLinkLogo}
     />
  </div>
);

export default LogosBar
