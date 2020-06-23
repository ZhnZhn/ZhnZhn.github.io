import { useEffect } from 'react'

/*eslint-disable react-hooks/exhaustive-deps */
const useListen = (store, onStore) => {
  useEffect(() => {
    const unsubscribe = store.listen(onStore)
    return () => {
      unsubscribe()
    }
  }, [])
}
/*eslint-enable react-hooks/exhaustive-deps */

export default useListen
