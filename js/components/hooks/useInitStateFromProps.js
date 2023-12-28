"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
const useInitStateFromProps = (initState, props) => {
  const _initState = () => ({
      ...initState(props),
      _props: props
    }),
    [state, setState] = (0, _uiApi.useState)(_initState);
  if (props !== state._props) {
    setState(_initState());
  }
  return [state, setState];
};
var _default = exports.default = useInitStateFromProps;
//# sourceMappingURL=useInitStateFromProps.js.map