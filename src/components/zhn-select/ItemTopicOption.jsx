import ItemOption from './ItemOption';

const S_TOPIC = {
  width: '100%',
  whiteSpace : 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: '#a487d4'
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
