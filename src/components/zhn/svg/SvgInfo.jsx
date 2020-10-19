import SvgIcon from './SvgIcon'

const SvgInfo = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12" y2="8" />
  </SvgIcon>
);

export default SvgInfo
