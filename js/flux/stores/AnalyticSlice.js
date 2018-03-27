'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LABEL = {
  ANSWER_OK: 'Answer Ok',
  ANSWER_VIEW: 'Answer View',
  ANSWER_NO: 'Answer No',
  NO_ANSWER: 'No Answer'
};

var Logic = {
  sendPageView: function sendPageView(eventLabel) {
    /* eslint-disable no-undef */
    if (window && window.ga) {
      ga('create', 'UA-85488410-1', {
        allowAnchor: false,
        cookieDomain: 'zhnzhn.github.io',
        cookieExpires: 0,
        storeGac: false,
        legacyHistoryImport: false

      });
      ga('set', 'anonymizeIp', true);
      ga('set', 'displayFeaturesTask', null);
      ga('set', 'screenResolution', ''); //sr
      ga('set', 'viewportSize', ''); //vp
      ga('set', 'screenColors', ''); //sc
      ga('set', 'javaEnabled', false); //je
      ga('set', 'title', 'ERC'); //dt
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
    var eventAction = _ref.eventAction,
        eventLabel = _ref.eventLabel;

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
  onAnswerView: function onAnswerView() {
    Logic.sendPageView(LABEL.ANSWER_VIEW);
  },
  onAnswerNo: function onAnswerNo() {
    //Logic.sendPageView(LABEL.ANSWER_NO);
  },
  onNoAnswer: function onNoAnswer() {
    //Logic.sendPageView(LABEL.NO_ANSWER);
  },
  analyticSendEvent: function analyticSendEvent(option) {
    if (this.isCanTrack) {
      Logic.sendItemEvent(option);
    }
  }
};

exports.default = AnalyticSlice;
//# sourceMappingURL=AnalyticSlice.js.map