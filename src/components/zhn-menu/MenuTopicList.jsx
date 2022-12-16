import MenuTopic from './MenuTopic';

const MenuTopicList = ({
  menu
}) => (menu || [])
 .map((menuTopicProps, index) => (
   <MenuTopic
      key={index}
      {...menuTopicProps}
    />
 ));

export default MenuTopicList
