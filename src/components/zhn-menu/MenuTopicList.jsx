import MenuTopic from './MenuTopic';

const MenuTopicList = ({
  menu,
  refFirstItem
}) => (menu || [])
 .map((menuTopicProps, index) => (
   <MenuTopic
      key={index}
      {...menuTopicProps}
      refFirstItem={index ===0 ? refFirstItem : void 0}
    />
 ));

export default MenuTopicList
