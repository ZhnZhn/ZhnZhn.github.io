import BrowserConfig from '../../../constants/BrowserConfig';

const isWithItemCounter = (
  browserType
) => {
  const _config = BrowserConfig[browserType];
  return typeof _config === 'undefined'
    ? false
    : !_config.withoutItemCounter;
}

export default isWithItemCounter
