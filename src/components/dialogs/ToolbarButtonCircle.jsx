import { memo } from 'react';

import D from './DialogCell';
import ButtonCircle from '../zhn/ButtonCircle';
import ItemStack from '../zhn/ItemStack';

const S = {
  ROW: {
    paddingTop: 2,
    paddingBottom: 4
  },
  BUTTON_CIRCLE: {
    marginLeft: 20
  }
};

const _crButton = ({ caption, title, onClick }, index) => (
  <ButtonCircle
    key={caption + index}
    style={S.BUTTON_CIRCLE}
    caption={caption}
    title={title}
    onClick={onClick}
  />
);

const ToolbarButtonCircle = memo(({ buttons }) => (
  <D.Row.Plain style={S.ROW}>
    <ItemStack items={buttons} crItem={_crButton} />
  </D.Row.Plain>
))

/*
ToolbarButtonCircle.propTypes = {
  buttons: PropTypes.arrayOf(
     PropTypes.shape({
      caption: PropTypes.string,
      title: PropTypes.string,
      onClick: PropTypes.func
    })
  ),
}
*/

export default ToolbarButtonCircle
