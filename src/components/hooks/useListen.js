import { useEffect } from 'react'

const useListen = (store, onStore) => {
  useEffect(() => {
    const unsubscribe = store.listen(onStore)
    return () => {
      unsubscribe()
    }
  }, [])
}

export default useListen
