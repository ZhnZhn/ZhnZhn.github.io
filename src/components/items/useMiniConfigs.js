import {
  useState,
  useMemo
} from '../uiApi';

const useMiniConfigs = () => {
  const [
    miniConfigs,
    setMiniConfigs
  ] = useState([])
  , [
    addConfig,
    removeConfig
  ] = useMemo(() => [
    (config, id) => {
       setMiniConfigs(prevState => {
         prevState.push({ config, id })
         return [...prevState];
       })
    },
    (id) => {
       setMiniConfigs(prevState => prevState
         .filter(c => c.id !== id))
    }
  ], []);

  return [
    miniConfigs,
    addConfig,
    removeConfig
  ];
};

export default useMiniConfigs
