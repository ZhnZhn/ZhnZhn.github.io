'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LABEL = {
  ANSWER_OK: 'Answer Ok',
  ANSWER_NO: 'Answer No',
  NO_ANSWER: 'No Answer'
};

var Logic = {
  sendPageView: function sendPageView(eventLabel) {
    /* eslint-disable no-undef */
    if (window && window.ga) {
      ga('create', 'UA-85488410-1', {
        'cookieDomain': 'zhnzhn.github.io',
        'cookieExpires': 0
      });
      ga('set', 'anonymizeIp', true);
      ga('send', 'pageview');

      if (eventLabel) {
        ga('send', {
          hitType: 'event',
          eventCategory: 'User',
          eventAction: 'Answer',
          eventLabel: eventLabel
        });
      }
    }
    /* eslint-enable no-undef */
  },
  sendItemEvent: function sendItemEvent(_ref) {
    var eventAction = _ref.eventAction;
    var eventLabel = _ref.eventLabel;

    /* eslint-disable no-undef */
    if (window && window.ga && eventLabel) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Item',
        eventAction: eventAction,
        eventLabel: eventLabel,
        eventValue: 1
      });
    }
    /* eslint-enable no-undef */
  }
};

var AnalyticSlice = {
  isCanTrack: false,

  onAnswerYes: function onAnswerYes() {
    this.isCanTrack = true;
    Logic.sendPageView(LABEL.ANSWER_OK);
  },
  onAnswerNo: function onAnswerNo() {
    Logic.sendPageView(LABEL.ANSWER_NO);
  },
  onNoAnswer: function onNoAnswer() {
    Logic.sendPageView(LABEL.NO_ANSWER);
  },
  analyticSendEvent: function analyticSendEvent(option) {
    if (this.isCanTrack) {
      Logic.sendItemEvent(option);
    }
  }
};

exports.default = AnalyticSlice;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\flux\stores\AnalyticSlice.js.map