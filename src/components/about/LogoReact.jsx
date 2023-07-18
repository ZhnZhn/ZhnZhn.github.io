import Svg100 from '../zhn/svg/Svg100';
import crCn from '../zhn-utils/crCn';
import { LOGO_SVG_PROPS }  from './StyleLogo';
import UseLogoById from './UseLogoById';

const CL_LOGO_REACT = 'logo-react'
, DF_ARIA_LABEL = 'React'
, HREF = 'https://reactjs.org';

const LogoReact = ({
  ariaLabel=DF_ARIA_LABEL,
  className
}) => (
    <a
       aria-label={DF_ARIA_LABEL}
       className={crCn(className, CL_LOGO_REACT)}
       href={HREF}
    >
    <Svg100
      {...LOGO_SVG_PROPS}
      w="600"
    >
      <UseLogoById id="React" />
   </Svg100>

  </a>
);

export default LogoReact
