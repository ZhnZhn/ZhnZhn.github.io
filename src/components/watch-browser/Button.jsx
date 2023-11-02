import FlatButton from '../zhn-m/FlatButton';

const Clear = ({ onClick }) => (
  <FlatButton
    caption="Clear"
    title="Clear Input"
    onClick={onClick}
  />
)

const Close = ({
  refBt,
  onClick
}) => (
  <FlatButton
    refBt={refBt}
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
