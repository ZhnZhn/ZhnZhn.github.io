import Svg100 from '../zhn/svg/Svg100';
import crCn from '../zhn-utils/crCn';
import { LOGO_SVG_PROPS } from './StyleLogo';
import UseLogoById from './UseLogoById';

const CL_LOGO_GITHUB = 'logo-github'
, DF_ARIA_LABEL = 'GitHub Repository';

const LogoGitHub = ({
  ariaLabel=DF_ARIA_LABEL,
  className,
  href
}) => (
  <a
    aria-label={ariaLabel}
    className={crCn(className, CL_LOGO_GITHUB)}
    href={href}
  >
    <Svg100
      {...LOGO_SVG_PROPS}
      w="16"
    >
      <UseLogoById id="GitHub" />            
    </Svg100>
  </a>
);

export default LogoGitHub
