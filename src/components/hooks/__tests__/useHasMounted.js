import { renderHook } from '@testing-library/react-hooks'
import useHasMounted from '../useHasMounted'

const _getHasMounted = result => result.current;

describe('useHasMounted',()=>{
  test('should return true only for first render', ()=>{
    const {
      result,
      rerender
    } = renderHook(() => useHasMounted());

    expect(_getHasMounted(result)).toBe(true)
    rerender()
    expect(_getHasMounted(result)).toBe(false)
    rerender()
    expect(_getHasMounted(result)).toBe(false)
  })
})
