'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fnAdapter = {
  crId: function crId(option) {
    var items = option.items,
        _option$dfId = option.dfId,
        dfId = _option$dfId === undefined ? 'id' : _option$dfId,
        _caption = items[0] ? items[0].caption : 'All Items';

    return dfId + '_' + _caption;
  },

  crInfo: function crInfo(_ref) {
    var _ref$label = _ref.label,
        label = _ref$label === undefined ? '' : _ref$label,
        _ref$updated = _ref.updated,
        updated = _ref$updated === undefined ? '' : _ref$updated;
    return {
      name: label,
      description: 'Statisctics Norway: ' + updated.replace('T', ' ').replace('Z', '')
    };
  },

  crZhConfig: function crZhConfig(option) {
    var dataSource = option.dataSource,
        _id = fnAdapter.crId(option);

    return {
      id: _id,
      key: _id,
      itemCaption: _id,
      isWithoutAdd: true,
      isWithLegend: false,
      dataSource: dataSource
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\fnAdapter.js.map