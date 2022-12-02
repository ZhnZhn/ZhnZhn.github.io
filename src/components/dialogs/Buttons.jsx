import FlatButton from '../zhn-m/FlatButton';

const S_LOAD = { color: '#607d8b' }
, S_SHOW = { color: '#232f3b' };

export const ButtonLoad = ({
  onClick
}) => (
  <FlatButton
    style={S_LOAD}
    caption="Load"
    title="Load Item to Container"
    onClick={onClick}
  />
);

export const ButtonShow = ({
  onClick
}) => (
  <FlatButton
    style={S_SHOW}
    caption="Show"
    title="Show Item Container"
    onClick={onClick}
  />
);
