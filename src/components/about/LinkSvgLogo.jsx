import { toHref } from '../uiApi';
import { crCn } from '../styleFn';

import Svg100 from '../zhn/svg/Svg100';
import UseLogoById from './UseLogoById';

const CL_LI = 'logo-item';

const LinkSvgLogo = ({
  ariaLabel,
  className,
  href,
  id,
  svgProps
}) => (
  <a
    aria-label={ariaLabel}
    className={crCn(CL_LI, className)}
    href={toHref(href)}
  >
    <Svg100
      {...svgProps}
      aria-hidden="true"
    >
      <UseLogoById id={id} />
    </Svg100>
  </a>
);

export default LinkSvgLogo
