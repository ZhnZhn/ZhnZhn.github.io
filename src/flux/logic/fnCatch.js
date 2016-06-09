
import Msg from '../../constants/Msg';

export const fnCatch = function({error, option, onFailed}){
  const chartId = option.value;

  let caption, descr;
  if (error instanceof TypeError){
    if (error.message.indexOf('fetch') !== -1) {
       caption = Msg.Alert.NETWORK_ERROR.caption;
       descr = Msg.Alert.NETWORK_ERROR.descr;
    } else {
      caption = (error.zhCaption) ? error.zhCaption : 'Runtime Error';
      descr = error.message;
    }
  } else {
    caption = (error.zhCaption) ? error.zhCaption : 'Runtime Error';
    descr = error.message;
  }
  onFailed({caption, descr ,chartId});
}
