import HotKeysContext from './HotKeysContext';
import HotKeysHandler from './HotKeysHandler';

const hmHotKeys = Object.create(null);

const HotKeysProvider = ({
  is,
  children
}) => (
  <HotKeysContext.Provider value={hmHotKeys}>
    <HotKeysHandler is={is} />
    {children}
  </HotKeysContext.Provider>
);

export default HotKeysProvider
