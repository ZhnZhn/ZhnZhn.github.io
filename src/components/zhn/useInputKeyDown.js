import { useCallback } from 'react'

const _isFn = fn => typeof fn === 'function'

/*eslint-disable react-hooks/exhaustive-deps*/
const useInputKeyDown = ({onEnter, onDelete}, deps=[]) => useCallback((event) => {
  const { code, keyCode } = event
  , _code = code || keyCode;
  switch(_code){
    case 'Delete': case 46:
    case 'Escape': case 27:
       event.preventDefault()
       onDelete()
       break;
    case 'Enter': case 13:
       if (_isFn(onEnter)) {
         onEnter(event.target.value)
       }
       break;
    default: return;
  }
}, deps);
/*eslint-enable react-hooks/exhaustive-deps*/

export default useInputKeyDown
