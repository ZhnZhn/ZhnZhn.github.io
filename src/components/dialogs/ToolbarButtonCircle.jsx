import D from './DialogCell';
import ButtonCircle from '../zhn/ButtonCircle';
import ItemStack from '../zhn/ItemStack';

const S_ROW = { padding: '2px 0 4px 0' }
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

const ToolbarButtonCircle = ({ buttons }) => (
  <D.Row.Plain style={S_ROW}>
    <ItemStack 
      items={buttons}
      crItem={_crButtonItem}
    />
  </D.Row.Plain>
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
