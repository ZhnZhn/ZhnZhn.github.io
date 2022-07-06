"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _IndicatorBuilder = require("../../charts/IndicatorBuilder");

var _RowType = _interopRequireDefault(require("./RowType2"));

var _jsxRuntime = require("react/jsx-runtime");

const _isInArrObjWithId = (arrObj, id) => {
  return !!arrObj.find(obj => obj.id === id);
};

const _crMfiConfig = id => ({
  id: id,
  color: '#90ed7d'
});

const _crId = period => 'MFI(' + period + ')';

const RowMfi = _ref => {
  let {
    getChart,
    onAddMfi,
    onRemoveMfi
  } = _ref;

  const _refPeriod = (0, _react.useRef)(),
        [mfiConfs, setMfiConfs] = (0, _react.useState)([]),
        _onAddMfi = () => {
    const _period = _refPeriod.current.getValue(),
          _id = _crId(_period);

    if (!_isInArrObjWithId(mfiConfs, _id)) {
      const chart = getChart(),
            config = (0, _IndicatorBuilder.crMfiConfig)(chart, _period, _id);

      if (config) {
        onAddMfi(config, _id);
        setMfiConfs([...mfiConfs, _crMfiConfig(_id)]);
      }
    }
  },
        _onRemoveMfi = id => {
    onRemoveMfi(id);
    setMfiConfs(mfiConfs.filter(d => d.id !== id));
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowType.default, {
    forwardRef: _refPeriod,
    caption: "MFI",
    initValue: 30,
    configs: mfiConfs,
    onAdd: _onAddMfi,
    onRemove: _onRemoveMfi
  });
};

var _default = RowMfi;
exports.default = _default;
//# sourceMappingURL=RowMfi.js.map