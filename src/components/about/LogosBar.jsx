

import ItemStack from '../zhn/ItemStack';
import { EVENODD_PROPS } from '../zhn/svg/Svg';

import LinkSvgLogo from './LinkSvgLogo';
import LinkLogo from './LinkLogo';

const _crHref = domain => `https://${domain}`
, _crAriaLabel = websiteName => `Visit ${websiteName}`
, _crLogoCn = suffix => `logo-${suffix.toLowerCase()}`
, CL_ROOT = _crLogoCn('container')
, GITHUB = 'GitHub'
, REACT = 'React'
, HIGHCHARTS = 'Highcharts'
, LINK_SVG_LOGO_CONFS = [
  [
    'Nasdaq Data Link',
    'ndl',
    'data.nasdaq.com',
    'NDLSemi',
    {w: '215', h: '36'}
  ],[
    `${GITHUB} repository of web app ERC`,
    GITHUB,
    'github.com/ZhnZhn/ZhnZhn.github.io',
    GITHUB,
    {...EVENODD_PROPS, w: '16'}
  ],[
    REACT,
    REACT,
    'react.dev',
    REACT,
    {...EVENODD_PROPS, w: '600'}
  ],[
    HIGHCHARTS,
    HIGHCHARTS,
    `www.highcharts.com`,
    HIGHCHARTS,
    {...EVENODD_PROPS, w: '425.197', h: '141.732'}
  ]
].map(([
  ariaLabelSuffix,
  logoCnSuffix,
  domain,
  id,
  svgProps
]) => [
  _crAriaLabel(ariaLabelSuffix),
  _crLogoCn(logoCnSuffix),
  _crHref(domain),
  id,
  svgProps
])
, LINK_LOGO_CONFS = [
  [
    _crHref('ec.europa.eu/eurostat'),
    'eurostat'
  ],[
    _crHref('comtrade.un.org'),
    'UN Comtrade'
  ],[
    _crHref('www.fao.org/faostat/en/#data'),
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
    id={id}
    ariaLabel={ariaLabel}
    className={className}
    href={href}
    svgProps={svgProps}
  />
);

const _crLinkLogo = ([
  href,
  caption
]) => (
  <LinkLogo
    key={caption}
    href={href}
    caption={caption}
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
