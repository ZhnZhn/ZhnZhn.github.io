import { useState, useCallback } from 'react';

const useMiniConfigs = () => {
  const [miniConfigs, setMiniConfigs] = useState([])
  , addConfig = useCallback((config, id) => {
      setMiniConfigs(prevState => {
        prevState.push({ config, id })
        return [...prevState];
      })
    }, [])
  , removeConfig = useCallback((id) => {
      setMiniConfigs(prevState => prevState
       .filter(c => c.id !== id))
    }, []);
  return [miniConfigs, addConfig, removeConfig];
};

export default useMiniConfigs
