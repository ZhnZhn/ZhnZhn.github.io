import { memo } from 'react';

import D from './DialogCell'
import ButtonCircle from '../zhn/ButtonCircle';

const S = {
  ROW: {
    paddingTop: 4,
    paddingBottom: 8
  },
  BUTTON_CIRCLE: {
    marginLeft: 20
  }
}

const _renderButtons = (buttons) => {
  return buttons.map((button, index) => {
    const { caption, title, onClick } = button;
    return (
      <ButtonCircle
        key={caption + index}
        caption={caption}
        title={title}
        style={S.BUTTON_CIRCLE}
        onClick={onClick}
      />
    );
  })
}

const ToolbarButtonCircle = memo(({ buttons=[] }) => (
  <D.Row.Plain style={S.ROW}>
    {_renderButtons(buttons)}
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
