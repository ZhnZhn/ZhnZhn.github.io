
const useRefInit = (ref, crValue) => ref.current
  ? ref.current
  : (ref.current = crValue());

export default useRefInit
