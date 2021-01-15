import toLink from '../zhn/toLink'
import FN from './tableFn'
import S from './Style'

const _isFn = fn => typeof fn === 'function';

const _crLinkEl = (id, title, fn) => {
  const _href = _isFn(fn)
    ? fn(id, title)
    : void 0;
  return (
    <a
      className={S.CL_LINK}
      href={toLink(_href)}
    >
      {title}
    </a>
  );
};


const _crTdStyle = (r, h) => {
  const { pn, style, isR } = h
  , v = r[pn]
  , _tdStyle = FN.crTdStyle({ S, v, isR })
  ,  tdStyle  = (r.style || {})[pn];

  return {...style, ..._tdStyle, ...tdStyle};
}
const _crTdElOrTitle = (r, h, numberFormat, valueToHref) => {
  const { pn, isHref } = h
  , v = r[pn]
  , _v = FN.toFormatValue({ h, v, fn: numberFormat })
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
          style={{...S.TD, ..._style}}
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
  <tbody>
    {_renderRows(props)}
  </tbody>
);


export default TableBody
