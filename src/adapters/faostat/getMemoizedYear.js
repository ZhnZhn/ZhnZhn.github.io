
let _memoized_year;
const _crYear = () => {
  const year = (new Date()).getUTCFullYear()
  , arr = [];
  let i = 1980;
  for(;i<year;i++){
    arr.push(i)
  }
  return _memoized_year = arr.join(',');
}
, getMemoizedYear = () => _memoized_year || _crYear();

export default getMemoizedYear
