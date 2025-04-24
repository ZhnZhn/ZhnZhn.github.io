import FlatButton from '../zhn-m/FlatButton';

const _fFlatButton = (
  caption,
  title
) => ({ onClick }) => (
  <FlatButton
    caption={caption}
    title={title}
    onClick={onClick}
  />
);

export const ButtonLoad = _fFlatButton(
  "Load",
  "Load Item to Container"
)

export const ButtonShow = _fFlatButton(
  "Show",
  "Show Item Container"
)
