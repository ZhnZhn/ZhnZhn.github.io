"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue,
    joinBy = _fnAdapter["default"].joinBy,
    toUpperCaseFirst = _fnAdapter["default"].toUpperCaseFirst;

var _crCaption = function _crCaption(_ref) {
  var _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      _ref$symbol = _ref.symbol,
      symbol = _ref$symbol === void 0 ? '' : _ref$symbol,
      _ref$rank = _ref.rank,
      rank = _ref$rank === void 0 ? '' : _ref$rank;
  return name + " (" + symbol + ") (" + rank + ")";
};

var _getDate = function _getDate(str) {
  return str ? ('' + str).split('T')[0] : '';
};

var _crToken = function _crToken(name, value) {
  return value ? name + ": " + value : '';
};

var _crTokens = function _crTokens(_ref2) {
  var started_at = _ref2.started_at,
      development_status = _ref2.development_status,
      hardware_wallet = _ref2.hardware_wallet,
      org_structure = _ref2.org_structure,
      hash_algorithm = _ref2.hash_algorithm,
      proof_type = _ref2.proof_type,
      platform = _ref2.platform;
  return [_crToken('Started At', _getDate(started_at)), _crToken('Dev Status', development_status), _crToken('Org', org_structure), _crToken('Hardware Wallet', hardware_wallet), _crToken('Hash Alg.', hash_algorithm), _crToken('Proof Type', proof_type), _crToken('Platform', platform)].filter(Boolean);
};

var _crOpenSource = function _crOpenSource(is) {
  return is ? 'OpenSource' : 'not OpenSource';
};

var _crIsActive = function _crIsActive(is) {
  return is ? 'Active' : 'not Active';
};

var _crTokensCaption = function _crTokensCaption(_ref3) {
  var type = _ref3.type,
      open_source = _ref3.open_source,
      is_active = _ref3.is_active;
  return joinBy(' ', toUpperCaseFirst(type), _crOpenSource(open_source), _crIsActive(is_active));
};

var _crDescr = function _crDescr(json) {
  return json.description || '';
};

var toCiConfig = {
  crKey: function crKey(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items;
    return option._itemKey = getValue(items[0]);
  },
  toConfig: function toConfig(json, option) {
    var _itemKey = option._itemKey,
        config = {
      zhCompType: "INFO_ITEM",
      id: _itemKey,
      caption: _crCaption(json),
      items: [{
        caption: _crTokensCaption(json),
        tokens: _crTokens(json)
      }, {
        style: {
          fontWeight: 'bold'
        },
        descr: _crDescr(json)
      }],
      zhConfig: {
        id: _itemKey,
        key: _itemKey
      }
    };
    return {
      config: config
    };
  }
};
var _default = toCiConfig;
exports["default"] = _default;
//# sourceMappingURL=toCiConfig.js.map