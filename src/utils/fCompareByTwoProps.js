
const fCompareByTwoProps = (propName1, propName2) => (a, b) => {
  if (a[propName1] < b[propName1]) { return -1; }
  else if (a[propName1] > b[propName1]) { return 1; }
  else if (a[propName2] < b[propName2]) { return -1; }
  else if (a[propName2] > b[propName2]) { return 1; }
  else return 0;
}

export default fCompareByTwoProps
