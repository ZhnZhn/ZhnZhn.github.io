import {
  useState,
  useMemo
} from '../uiApi';

// [is, toggle, close]
const useToggleClose = (
  initialValue
) => {
  const [
    is,
    setIs
  ] = useState(() => !!initialValue);

  return [
    is,
    ...useMemo(() => [
      () => setIs(is => !is),
      () => setIs(false)
    ], [])
  ];
};

export default useToggleClose
