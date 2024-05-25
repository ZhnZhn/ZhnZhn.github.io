
let _memoizedYears = Object.create(null);
const _crYear = (fromYear) => {
  const year = (new Date()).getUTCFullYear()
  , arr = [];
  for(;fromYear<year;fromYear++){
    arr.push(fromYear)
  }
  return _memoizedYears[fromYear] = arr.join(',');
}
, getMemoizedYear = (
  fromYear
) => _memoizedYears[fromYear] || _crYear(fromYear);

export default getMemoizedYear
