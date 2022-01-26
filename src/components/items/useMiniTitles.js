import { useState, useCallback } from 'react';

const _crMiniTitles = (miniTitles, btTitle) => {
  return miniTitles.indexOf(btTitle) === -1
    ? [btTitle, ...miniTitles]
    : miniTitles.filter(t => t !== btTitle);
};

const useMiniTitles = () => {
  const [miniTitles, setMiniTitles] = useState([])
  , _hMiniChart = useCallback((btTitle) => {
    setMiniTitles(prevState => _crMiniTitles(prevState, btTitle))
  }, [])
  return [miniTitles, _hMiniChart];
};

export default useMiniTitles
