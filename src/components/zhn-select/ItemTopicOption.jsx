import ItemOption from './ItemOption';
import { CL_ITEM_OPTION } from './CL';

const S_TOPIC = { color: '#a487d4' };

const ItemTopicOption = (props) => {
  const { item } = props;
  return (
     <div>
       <ItemOption {...props} />
       <div className={CL_ITEM_OPTION} style={S_TOPIC}>
         {item.topic}
       </div>
     </div>
  );
};

export default ItemTopicOption
