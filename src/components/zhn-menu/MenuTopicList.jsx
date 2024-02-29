import { safeMap } from '../uiApi';
import MenuTopic from './MenuTopic';

const MenuTopicList = ({
  refFirstItem,
  menu,
  itemStyle,
  topicStyle
}) => safeMap(menu, (menuTopicProps, index) => (
  <MenuTopic
     key={index}
     {...menuTopicProps}
     itemStyle={itemStyle}
     topicStyle={topicStyle}
     refFirstItem={index ===0 ? refFirstItem : void 0}
  />
));

export default MenuTopicList
