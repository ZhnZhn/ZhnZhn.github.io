
const _isNaN = (v) => Number.isNaN(v);

const _compMaybeNaN = (v1, v2) => {
  if ( _isNaN(v1) )  {
    if ( _isNaN(v2) ) {
      return 0;
    } else {
      return 1;
    }
  }
  if ( _isNaN(v2) ) {
    return -1;
  }
  return 2;
};

const _compNumber = (v1, v2) => {
  const _r = _compMaybeNaN(v1, v2);
  if (_r !== 2) return _r;
  if ( v1 < v2 ) return 1;
  if ( v1 > v2 ) return -1;
  return 0;
};

const _compStr = (v1, v2) => {
  if ( v1 < v2 ) return 1;
  if ( v1 > v2 ) return -1;
  return 0;
};


const compFactory = {
  compBy: (TOKEN_NAN, pn) => (a, b) => {
    const v1 = a[pn], v2 = b[pn];
    if (typeof v1 === 'number' || v1 === TOKEN_NAN) {
      return _compNumber(v1, v2);
    } else {
      return _compStr(v1, v2);
    }
  },

  opCompBy: (pn, fn) => (a, b) => {
    const _r = _compMaybeNaN(a[pn], b[pn]);
    if (_r !== 2) return _r;
    return fn(b, a);
  }

}

export default compFactory
