'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CHANNEL = 'WITH_LOADING_PROGRESS';

var WithLoadingProgress = {
  listenLoadingProgress: function listenLoadingProgress(fnHandle) {
    var _this = this;

    this.emitter.addListener(CHANNEL, fnHandle);
    return function () {
      _this.emitter.removeListener(fnHandle);
    };
  },
  triggerLoadingProgress: function triggerLoadingProgress(actionType) {
    this.emitter.emit(CHANNEL, actionType);
  }
};

exports.default = WithLoadingProgress;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\WithLoadingProgress.js.map