import { safeMap } from '../uiApi';
import MenuTopic from './MenuTopic';

const MenuTopicList = (props) => safeMap(
  props.menu,
  (menuTopicProps, index) => (<MenuTopic
     key={index}
     {...menuTopicProps}
     itemStyle={props.itemStyle}
     topicStyle={props.topicStyle}
     refFirstItem={index === 0 ? props.refFirstItem : void 0}
  />
));

export default MenuTopicList
