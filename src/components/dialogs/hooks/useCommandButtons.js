import useRefInit from '../../hooks/useRefInit';
import D from '../DialogCell';

const useCommandButtons = hLoad => useRefInit(() => [
  <D.Button.Load key="load" onClick={hLoad} />
]);

export default useCommandButtons
