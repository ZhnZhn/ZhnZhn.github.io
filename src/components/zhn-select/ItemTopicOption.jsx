import {
  S_ELLIPSIS
} from '../styles/GeneralStyles';
import ItemOption from './ItemOption';

const S_TOPIC = {
  color: '#a487d4',
  width: '100%',
  ...S_ELLIPSIS
};

const ItemTopicOption = (props) => {
  const { item } = props;
  return (
     <div>
       <ItemOption {...props} />
       <div style={S_TOPIC}>
         {item.topic}
       </div>
     </div>
  );
};

export default ItemTopicOption
