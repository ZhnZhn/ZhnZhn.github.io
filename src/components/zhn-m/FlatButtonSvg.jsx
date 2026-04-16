import {
  SvgInfo,
  SvgSettings,
  SvgToggleOn,
  SvgDelete
} from '../zhn/svg/SvgIcon';
import IconButton from './IconButton';

const S_ICON_BT_SVG = {
  verticalAlign: 'middle'
};

const _crButtonSvg = (
  SvgIcon,
  config
) => (props) => (
  <IconButton {...props} {...config}>
    <SvgIcon style={S_ICON_BT_SVG} />
  </IconButton>
);

export const FlatButtonInfo = _crButtonSvg(SvgInfo)
export const FlatButtonSettings = _crButtonSvg(SvgSettings)
export const FlatButtonToggleOn = _crButtonSvg(SvgToggleOn)
export const FlatButtonDelete = _crButtonSvg(SvgDelete)
