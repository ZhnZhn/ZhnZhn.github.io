import ButtonCircle from './ButtonCircle';
import ItemStack from './ItemStack';

const S_TOOLBAR = {
  display: 'flex',
  alignItems: 'center',
  padding: '6px 5px'
}
, S_BUTTON_CIRCLE = { marginLeft: 20 };

const _crButtonItem = ({
  caption,
  title,
  onClick
}, index) => (
  <ButtonCircle
    key={caption + index}
    style={S_BUTTON_CIRCLE}
    caption={caption}
    title={title}
    onClick={onClick}
  />
);

const ToolbarButtonCircle = ({
  buttons
}) => (
  <div style={S_TOOLBAR} role="toolbar">
    <ItemStack
       items={buttons}
       crItem={_crButtonItem}
    />
  </div>
);

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
