import { crCn } from '../styleFn';

import Link from '../zhn/Link';
import { Svg100 } from '../zhn/svg/Svg';
import UseLogoById from './UseLogoById';

const CL_LI = 'logo-item';

const LinkSvgLogo = (props) => (
  <Link
    ariaLabel={props.ariaLabel}
    className={crCn(CL_LI, props.className)}
    href={props.href}
  >
    <Svg100 {...props.svgProps}>
      <UseLogoById id={props.id} />
    </Svg100>
  </Link>
);

export default LinkSvgLogo
