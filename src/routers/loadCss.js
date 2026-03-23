import { isStr } from '../utils/isTypeFn';
import { resolvePromise } from './asyncFn';

const _assign = Object.assign
, _crElement = tag => document.createElement(tag);

const isCss = Object.create(null);
export const loadCss = href => isCss[href] || !isStr(href)
  ? resolvePromise()
  : new Promise((resolve, reject) => {
      const _elLink = _assign(_crElement("link"), {
        rel: "stylesheet",
        href,
        onload: () => {
          isCss[href] = true
          resolve()
        },
        onerror: () => {
          _elLink.remove()
          reject()
        }
      })
      // Insert it at the end of the head in a legacy-friendly manner
      const { head } = document
      , { childNodes } = head;
      head.insertBefore(_elLink, childNodes[childNodes.length - 1].nextSibling);
  })
