
const USER_ANSWER_NO = 'erc-answer-no'
    , USER_NO_ANSWER = 'erc-no-answer'

const Logic = {
  sendPageView(userId){
    /* eslint-disable no-undef */
    if (window && window.ga){
      ga('create' , 'UA-85488410-1', {
          'cookieDomain' : 'zhnzhn.github.io',
          'cookieExpires' : 0
      })
      ga('set', 'anonymizeIp', true);
      if (userId) {
        ga('set', 'userId', userId);
      }
      ga('send', 'pageview');
    }
    /* eslint-enable no-undef */
  }
}

const AnalyticSlice = {
  isCanTrack : false,

  onAnswerYes(){
    this.isCanTrack = true;
    Logic.sendPageView();
  },
  onAnswerNo(){
    Logic.sendPageView(USER_ANSWER_NO);
  },
  onNoAnswer(){
    Logic.sendPageView(USER_NO_ANSWER);
  }

};

export default AnalyticSlice
