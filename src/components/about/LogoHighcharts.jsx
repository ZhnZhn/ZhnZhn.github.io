import Svg100 from '../zhn/svg/Svg100';
import crCn from '../zhn-utils/crCn';
import { LOGO_SVG_PROPS } from './StyleLogo';
import UseLogoById from './UseLogoById';

const CL_LOGO_HIGHCHARTS = 'logo-highcharts'
, DF_ARIA_LABEL = 'Highcharts'
, HREF = 'https://www.highcharts.com';

const IconHighcharts = ({
  ariaLabel=DF_ARIA_LABEL,
  className
}) => (
  <a
     aria-label={ariaLabel}
     className={crCn(className, CL_LOGO_HIGHCHARTS)}
     href={HREF}
  >
    <Svg100
       {...LOGO_SVG_PROPS}
       w="425.197"
       h="141.732"
    >
       <UseLogoById id="Highcharts" />
    </Svg100>
  </a>
);


export default IconHighcharts
