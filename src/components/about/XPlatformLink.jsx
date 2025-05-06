import Link from '../zhn/Link';
import { Svg } from '../zhn/svg/Svg';

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
   userSelect: 'none'
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

const XPlatformLink = (props) => (
  <Link
     href={`${X_URL}/${props.account}`}
     className={CL_LINK_X}
     style={{...S_LINK, ...props.style}}
     title={props.title}
  >
    <Svg
      w="22"
      style={{...S_ICON, ...props.iconStyle}}
      aria-hidden={true}
    >
      <path d="M16.99 0H20.298L13.071 8.26L21.573 19.5H14.916L9.702 12.683L3.736 19.5H0.426L8.156 10.665L0 0H6.826L11.539 6.231L16.99 0ZM15.829 17.52H17.662L5.83 1.876H3.863L15.829 17.52Z" />
    </Svg>
    <span>@{props.account}</span>
  </Link>
);

export default XPlatformLink
