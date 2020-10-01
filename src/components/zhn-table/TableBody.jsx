import React from 'react'

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
      href={_href}
    >
      {title}
    </a>
  );
};

const _crTd = (rId, r, h, hIndex, numberFormat, valueToHref) => {
  const { pn, style, isR, isHref } = h
  , _key = rId + hIndex
  , v = r[pn]
  , _v = FN.toFormatValue({ h, v, fn: numberFormat })
  , _tdStyle = FN.crTdStyle({ S, v, isR })
  , _elOrTitle = isHref
        ? _crLinkEl(r.id, _v, valueToHref)
        : _v;
  return [ _key, {...style, ..._tdStyle}, _elOrTitle ];
}

const _renderRows = (props) => {
  const { headers, rows, tableFn } = props
  , {
      numberFormat,
      valueToHref
    } = tableFn;

  return rows.map((r, rIndex) => {
    const _rId = r.id
    , _elTds = headers.map((h, hIndex) => {
      if (h.isHide) {
        return null;
      }
      const [ _key, _style, _elOrTitle ] = _crTd(
        _rId, r, h, hIndex, numberFormat, valueToHref
      );
      return (
        <td
          key={_key}
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

const TableBody = (props) => {
  return (
    <tbody>
      {_renderRows(props)}
    </tbody>
  );
}

export default TableBody
