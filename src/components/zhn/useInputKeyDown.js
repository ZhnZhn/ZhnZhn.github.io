import {
  useCallback,
  stopImmediatePropagation
} from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps*/
const useInputKeyDown = (
  {onEnter, onDelete},
  deps=[]
) => useCallback(evt => {
  stopImmediatePropagation(evt)
  const _code = evt.code || evt.keyCode;
  switch(_code){
    case 'Delete': case 46:
    case 'Escape': case 27:
       evt.preventDefault()
       onDelete()
       break;
    case 'Enter': case 13:
       if (typeof onEnter === 'function') {
         onEnter(evt.target.value)
       }
       break;
    default: return;
  }
}, deps);
/*eslint-enable react-hooks/exhaustive-deps*/

export default useInputKeyDown
