import { safeMap } from '../uiApi';
import MenuTopic from './MenuTopic';

const MenuTopicList = ({
  refFirstItem,
  menu,
  itemStyle
}) => safeMap(menu, (menuTopicProps, index) => (
  <MenuTopic
     key={index}
     {...menuTopicProps}
     itemStyle={itemStyle}
     refFirstItem={index ===0 ? refFirstItem : void 0}
  />
));

export default MenuTopicList
