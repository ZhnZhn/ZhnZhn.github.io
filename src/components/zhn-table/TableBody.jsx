import { toHref } from '../uiApi';
import {
  crTdStyle,
  toFormatValue
} from './tableFn';
import {
  CL_LINK,
  S_TD,
  CL_BLACK
} from './Style'

const _isFn = fn => typeof fn === 'function';

const _crLinkEl = (id, title, fn) => {
  const _href = _isFn(fn)
    ? fn(id, title)
    : void 0;
  return (
    <a
      className={CL_LINK}
      href={toHref(_href)}
    >
      {title}
    </a>
  );
};


const _crTdStyle = (r, h) => {
  const { pn, style, isR } = h
  , v = r[pn]
  , _tdStyle = crTdStyle({ v, isR })
  ,  tdStyle  = (r.style || {})[pn];

  return {
    ...style,
    ..._tdStyle,
    ...tdStyle
  };
}
const _crTdElOrTitle = (r, h, numberFormat, valueToHref) => {
  const { pn, isHref } = h
  , v = r[pn]
  , _v = toFormatValue({ h, v, fn: numberFormat })
  return  isHref
    ? _crLinkEl(r.id, _v, valueToHref)
    : _v;
}

const _renderRows = (props) => {
  const { headers, rows, tableFn } = props
  , {
      numberFormat,
      valueToHref
    } = tableFn || {};

  return rows.map(r => {
    const _rId = r.id
    , _elTds = headers.map((h, hIndex) => {
      if (h.isHide) {
        return null;
      }
      const _key = `${_rId}_${hIndex}`
      , _style = _crTdStyle(r, h)
      , _elOrTitle = _crTdElOrTitle(r, h, numberFormat, valueToHref);
      return (
        <td
          key={_key}
          role="cell"
          style={{...S_TD, ..._style}}
        >
          {_elOrTitle}
        </td>
      );
    }).filter(Boolean);

    return (
      <tr key={_rId} role="row">
        {_elTds}
      </tr>
    );
  });
}

const TableBody = (props) => (
  <tbody className={CL_BLACK}>
    {_renderRows(props)}
  </tbody>
);


export default TableBody
