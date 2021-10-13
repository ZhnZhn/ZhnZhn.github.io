import { useRef, useEffect } from 'react'

const usePreviosProps = props => {
  const ref = useRef()
  useEffect(() => {
    ref.current = props
  }, [props])
  return ref.current
}

export default usePreviosProps
