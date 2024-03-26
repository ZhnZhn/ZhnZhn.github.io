import { isKeyEnterOrBlank } from '../hooks/fUseKey';
import SvgMore from '../zhn/SvgMore';

import { crAppearance } from './tableFn';
import {
  CL_BLACK,
  S_THEAD,
  S_TH,
  S_BT_SVG_MORE,
  crSvgMoreStyle,
  S_TH_MORE_SPAN
} from './Style';

const C = {
  UP: 'UP',
  DOWN: 'DOWN',

  ASC: 'ascending',
  DESC: 'descending'
};

const ThMore = ({ name, onMenuMore }) => (
  <>
    <SvgMore
       style={S_BT_SVG_MORE}
       svgStyle={crSvgMoreStyle()}
       onClick={onMenuMore}
    />
    <span style={S_TH_MORE_SPAN}>
      {name}
    </span>
  </>
);

const _renderHeader = (props, _hThKeyDown) => {
  const {
    gridId,
    thMoreStyle,
    headers,
    sortBy,
    sortTo,
    onSort,
    onMenuMore
  } = props;
  return headers.map((h, hIndex) => {
    if (h.isHide) {
      return null;
    }
    const { name, pn } = h
    , {
        style,
        ariaSort, ariaLabel
      } = crAppearance({
        C, pn, name, sortBy, sortTo
      })
    , _nameOrEl = hIndex === 0
        ? (<ThMore
             name={name}
             onMenuMore={onMenuMore}
           />)
        : name
    , _thStyle = hIndex === 0
         ? {...thMoreStyle, ...style}
         : style;
    return (
      <th
        key={h.name}
        style={{...S_TH, ..._thStyle}}
        rowSpan="1"
        colSpan="1"
        tabIndex="0"
        arial-controls={gridId}
        aria-label={ariaLabel}
        aria-sort={ariaSort}
        onClick={() => onSort(pn)}
        onKeyDown={(event) => _hThKeyDown(event, pn)}
      >
        {_nameOrEl}
      </th>
    );
  }).filter(Boolean);
}

const TableHead = (props) => {
  const _hThKeyEnter = (evt, pn) => {
    if (isKeyEnterOrBlank(evt)) {
      props?.onSort(pn)
    }
  }
  return (
    <thead className={CL_BLACK} style={S_THEAD}>
       <tr>
         {_renderHeader(props, _hThKeyEnter)}
       </tr>
    </thead>
  );
}

/*
TableHead.propTypes = {
  gridId: PropTypes.string,
  thMoreStyle: PropTypes.object,
  headers: PropTypes.arrayOf(
     PropTypes.shape({
      isHide: PropTypes.bool,
      name: PropTypes.string,
      pn: PropTypes.string,
      isR: PropTypes.bool,
      isF: PropTypes.bool,
      isHref: PropTypes.bool,
      style: PropTypes.object
    })
  ),
  sortBy: PropTypes.string,
  sortTo: PropTypes.string,
  onSort: PropTypes.func,
  onMenuMore: PropTypes.func
}
*/

export default TableHead
