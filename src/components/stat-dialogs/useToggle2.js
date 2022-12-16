import {
  useState,
  useMemo
} from '../uiApi';

const useToggle2 = (
  initialValue
) => {
  const [
    is,
    setIs
  ] = useState(initialValue)
  return [
    is,
    ...useMemo(() => [
      () => setIs(is=>!is),
      () => setIs(false)
    ], [])
  ];
};

export default useToggle2
