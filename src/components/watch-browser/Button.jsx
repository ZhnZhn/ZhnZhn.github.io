import FlatButton from '../zhn-m/FlatButton';

const S_BT = { color: '#232f3b' };

const Clear = ({ onClick }) => (
  <FlatButton
    style={S_BT}
    caption="Clear"
    title="Clear Input"
    onClick={onClick}
  />
)

const Close = ({ onClick }) => (
  <FlatButton
    style={S_BT}
    caption="Close"
    title="Close Dialog"
    onClick={onClick}
  />
)

const Primary = ({
  caption,
  title,
  onClick
}) => (
  <FlatButton
    caption={caption}
    title={title}
    isPrimary={true}
    onClick={onClick}
  />
)

export default { Primary, Clear, Close, Flat: FlatButton }
