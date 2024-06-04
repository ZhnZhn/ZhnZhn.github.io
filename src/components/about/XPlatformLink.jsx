const COLOR = '#faebd7'
, X_URL = 'https://x.com'
, CL_LINK_X = "x-link"
, S_LINK = {
   color: COLOR,
   display: 'inline-block',
   position: 'relative',
   top: -7,
   height: 28,
   padding: '1px 10px 1px 9px',
   borderRadius: 4,
   outline: 0,
   textDecoration: 'none',
   userSelect: 'none',
   cursor: 'pointer'
}
, S_ICON = {
   fill: COLOR,
   stroke: COLOR,
   display: 'inline-block',
   position: 'relative',
   top: 4,
   width: 18,
   height: 18,
   marginRight: 8
};

const TITLE = "X formerly known as Twitter";

const XPlatformLink = ({
  style,
  iconStyle,
  account,
  title
}) => account ? (
  <a
     className={CL_LINK_X}
     style={{...S_LINK, ...style}}
     target="_blank"
     href={`${X_URL}/${account}`}
     title={title}
  >
    <svg
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
      style={{...S_ICON, ...iconStyle}}
      aria-label={TITLE}
    >
      <title>{TITLE}</title>
      <path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z" />
    </svg>
    <span>@{account}</span>
  </a>
) : null;

export default XPlatformLink
