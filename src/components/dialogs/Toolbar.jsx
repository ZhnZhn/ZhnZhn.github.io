import ShowHide from '../zhn/ShowHide';
import {
  ToolbarButtonSvg
} from '../zhn/ToolbarButtonCircle';

const Toolbar = ({
  isShow,
  buttons
}) => (
  <ShowHide
    isShow={isShow}
    withoutAnimation={!0}
  >
    <ToolbarButtonSvg>
      {buttons}
    </ToolbarButtonSvg>
  </ShowHide>
);

export default Toolbar
