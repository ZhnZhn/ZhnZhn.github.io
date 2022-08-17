import { useEffect } from '../uiApi';
import useHasMounted from './useHasMounted';

const useDidUpdate = (
  onDidUpdate,
  deps
) => {
  const _hasMounted = useHasMounted();
  /*eslint-disable react-hooks/exhaustive-deps */
   useEffect(() => {
     if (!_hasMounted) {
       onDidUpdate()
     }
   }, deps)
   // _hasMounted, onDidUpdate
   /*eslint-enable react-hooks/exhaustive-deps */
};

export default useDidUpdate
