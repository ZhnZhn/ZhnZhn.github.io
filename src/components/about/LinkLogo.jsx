import Link from '../zhn/Link';

const CL_LOGO = 'logo-item data-provider-logo';

const LinkLogo = (props) => (
  <Link
    className={props.className || CL_LOGO}
    href={props.href}
  >
    {props.caption}
  </Link>
);

export default LinkLogo
