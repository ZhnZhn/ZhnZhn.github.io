import AdapterFn from '../AdapterFn';

const {
  toUpperCaseFirst
} = AdapterFn;

const DATASET_EMPTY = "Dataset is empty";

const _crBlackSpan = text => text ? `<span style='color:black;'>${text}</span>`: '';
const _crWrSpan = text => text ? `<span style='display:inline-block;width:75px;text-align:right;'>${text}</span>`: '';

const _crDescrRow = (title, value, code='') => {
  const _codeText = code ? ` (Code: ${code})` : '';
  return value
    ? `<div>${_crWrSpan(title+':')} ${_crBlackSpan(value)}${_codeText}</div>`
    : '';
};


const _toDescr = (item, title) => {
  const _isList = title.indexOf('> (List)') !== -1
  , { Area='', Domain='', Item='', Element='', Unit } = item
  , _areaDescrRow = _isList ? '' : _crDescrRow('Area', Area, item['Area Code'])
  , _Unit = toUpperCaseFirst(Unit);
  return `<div>
    ${_areaDescrRow}
    ${_crDescrRow('Domain', Domain, item['Domain Code'])}
    ${_crDescrRow('Item', Item, item['Item Code'])}
    ${_crDescrRow('Element', Element, item['Element Code'])}
    ${_crDescrRow('Unit', _Unit)}
    <div>${item['Flag Description'] || DATASET_EMPTY}</div>
  </div>`;
};

const fnDescr = {
  toInfo(json, title, subtitle) {
    const { data } = json
    , _itemNewest = data[data.length-1] || {}
    , _itemOldest = data[0] || {}
    , _dateNewest = _itemNewest.Year || ''
    , _dateOldest = _itemOldest.Year || ''
    , _descr = _toDescr(_itemNewest, title);
    return {
      description: _descr,
      frequency: "Annual",
      name: title + ': ' + subtitle,
      toDate: _dateNewest,
      fromDate: _dateOldest
    };
   }
};

export default fnDescr
