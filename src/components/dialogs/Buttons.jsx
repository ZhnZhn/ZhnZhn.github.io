import FlatButton from '../zhn-m/FlatButton';

const S_LOAD = { color: '#607d8b' }
, S_SHOW = { color: '#232f3b' };

const _fFlatButton = (
  style,
  caption,
  title
) => ({ onClick }) => (
  <FlatButton
    style={style}
    caption={caption}
    title={title}
    onClick={onClick}
  />
)

export const ButtonLoad = _fFlatButton(
  S_LOAD,
  "Load",
  "Load Item to Container"
)

export const ButtonShow = _fFlatButton(
  S_SHOW,
  "Show",
  "Show Item Container"
)
