import {
  isBool,
  isNumber,
  isStr
} from "./isTypeFn";

const _reEscapeHtml = /[<>&"]/g
, HP_ESCAPE_HTML = Object.create(null);
HP_ESCAPE_HTML['<'] = '&lt;'
HP_ESCAPE_HTML['>'] = '&gt;'
HP_ESCAPE_HTML['&'] = '&amp;'
HP_ESCAPE_HTML['"'] = '&quot;'
Object.freeze(HP_ESCAPE_HTML)

export const escapeStrHtml = (str) => isStr(str)
  ? str.replace(_reEscapeHtml, (ch) => HP_ESCAPE_HTML[ch] || ch)
  : ''

export const escapeNumberOr = (v) => isNumber(v)
  ? ''+v
  : escapeStrHtml(v)

let _isSupportOptions;
const onceOptions = {
  get once(){
    _isSupportOptions = true
    return true;
  }
};

export const isSupportOptions = () => {
  if (isBool(_isSupportOptions)){
    return _isSupportOptions;
  }
  try {
    window.addEventListener('test', onceOptions, onceOptions)
    window.removeEventListener('test', onceOptions, onceOptions)
  } catch {
    _isSupportOptions = false
  }
  return _isSupportOptions;
}
