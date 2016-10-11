'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var USER_ANSWER_NO = 'erc-answer-no',
    USER_NO_ANSWER = 'erc-no-answer';

var Logic = {
  sendPageView: function sendPageView(userId) {
    /* eslint-disable no-undef */
    if (window && window.ga) {
      ga('create', 'UA-85488410-1', {
        'cookieDomain': 'zhnzhn.github.io',
        'cookieExpires': 0
      });
      ga('set', 'anonymizeIp', true);
      if (userId) {
        ga('set', 'userId', userId);
      }
      ga('send', 'pageview');
    }
    /* eslint-enable no-undef */
  }
};

var AnalyticSlice = {
  isCanTrack: false,

  onAnswerYes: function onAnswerYes() {
    this.isCanTrack = true;
    Logic.sendPageView();
  },
  onAnswerNo: function onAnswerNo() {
    Logic.sendPageView(USER_ANSWER_NO);
  },
  onNoAnswer: function onNoAnswer() {
    Logic.sendPageView(USER_NO_ANSWER);
  }
};

exports.default = AnalyticSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\AnalyticSlice.js.map