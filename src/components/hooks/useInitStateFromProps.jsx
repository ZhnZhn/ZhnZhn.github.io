import { useState } from '../uiApi';

const useInitStateFromProps = (
  initState,
  props
) => {
  const _initState = () => ({
    ...initState(props),
    _props: props
  })
  , [
    state,
    setState
  ] = useState(_initState);

  if (props !== state._props) {
    setState(_initState())
  }

  return [
    state,
    setState
  ];
};

export default useInitStateFromProps
