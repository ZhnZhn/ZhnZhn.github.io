import {
  SvgInfo,
  SvgSettings,
  SvgToggleOn
} from '../zhn/svg/SvgIcon';
import FlatButton from './FlatButton';

const S_SVG_BT = {
  verticalAlign: 'middle',
  margin: '0 8px 3px 8px'
};

const _fFlatButtonSvg = (
  SvgIcon,
  config
) => (props) => (
  <FlatButton {...props} {...config}>
    <SvgIcon style={S_SVG_BT} />
  </FlatButton>
);

export const FlatButtonInfo = _fFlatButtonSvg(
  SvgInfo,
  {timeout: 0}
)
export const FlatButtonSettings = _fFlatButtonSvg(
  SvgSettings
)
export const FlatButtonToggleOn = _fFlatButtonSvg(
  SvgToggleOn,
  {timeout: 0}
)
