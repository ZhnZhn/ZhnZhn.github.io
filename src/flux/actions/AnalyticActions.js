import Reflux from 'reflux';

export const AnalyticActionTypes = {
  ANSWER_YES : 'answerYes',
  ANSWER_VIEW: 'answerView',
  ANSWER_NO  : 'answerNo',
  NO_ANSWER  : 'noAnswer'
};
const A = AnalyticActionTypes;

const AnalyticActions = Reflux.createActions({
  [A.ANSWER_YES]: {},
  [A.ANSWER_NO]: {},
  [A.ANSWER_VIEW]: {},
  [A.NO_ANSWER]: {}
});

export default AnalyticActions
