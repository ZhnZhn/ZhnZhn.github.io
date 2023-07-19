import toLink from '../zhn/toLink';

const CL_LOGO = 'logo-item data-provider-logo';

const LinkLogo = ({
  className=CL_LOGO,
  href,
  caption,
  ariaLabel=caption
}) => (
  <a
    aria-label={ariaLabel}
    className={className}
    href={toLink(href)}
  >
   {caption}
  </a>
);

export default LinkLogo
