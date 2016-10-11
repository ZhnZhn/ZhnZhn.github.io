import Reflux from 'reflux';

export const AnalyticActionTypes = {
  ANSWER_YES : 'answerYes',
  ANSWER_NO  : 'answerNo',
  NO_ANSWER  : 'noAnswer'
};

const AnalyticActions = Reflux.createActions({
  [AnalyticActionTypes.ANSWER_YES] : {},
  [AnalyticActionTypes.ANSWER_NO] : {},
  [AnalyticActionTypes.NO_ANSWER] : {}
});

export default AnalyticActions
