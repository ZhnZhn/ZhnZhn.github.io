'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DialogStyles = require('../../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useRowCaption = function useRowCaption() {
  var caption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    caption: _DialogStyles2.default.crRowCaption(caption)
  };
};

exports.default = useRowCaption;
//# sourceMappingURL=useRowCaption.js.map