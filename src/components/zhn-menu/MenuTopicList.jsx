import MenuTopic from './MenuTopic';

const MenuTopicList = ({
  menu
}) => (menu || []).map((menuTopic, index) => (
   <MenuTopic key={index} {...menuTopic} />)
);

export default MenuTopicList
