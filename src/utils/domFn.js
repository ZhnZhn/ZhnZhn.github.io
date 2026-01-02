import DOMPurify from "dompurify";
import { isBool } from "./isTypeFn";

//only HTML { USE_PROFILES: { html: true } }, not SVG and MathML
const _sanitize = DOMPurify.sanitize;

export const domSanitize = (
  str
) => _sanitize(str, {USE_PROFILES: { html: true }})


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
  } catch(err) {
    _isSupportOptions = false
  }
  return _isSupportOptions;
}
