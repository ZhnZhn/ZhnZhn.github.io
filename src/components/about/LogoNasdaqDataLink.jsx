import Svg100 from '../zhn/svg/Svg100';
import crCn from '../zhn-utils/crCn';
import { ARIA_HIDDEN_PROPS } from './StyleLogo';
import UseLogoById from './UseLogoById';

const CL_NDL = "logo-ndl"
, NDL = "Nasdaq Data Link"
, HREF = "https://data.nasdaq.com";

const LogoNasdaqDataLink = ({
  ariaLabel=NDL,
  className
}) => (
  <a
     aria-label={ariaLabel}
     className={crCn(className, CL_NDL)}
     href={HREF}
  >
  <Svg100
    {...ARIA_HIDDEN_PROPS}
    w="215"
    h="36"
  >
    <UseLogoById id="NDLSemi" />    
  </Svg100>
 </a>
);

export default LogoNasdaqDataLink
