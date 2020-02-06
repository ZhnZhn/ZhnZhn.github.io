import withDnDStyle from './withDnDStyle';
import withDnDGroup from './withDnDGroup';
import withDnDList from './withDnDList';
import withDnDItem from './withDnDItem';

const withWatchDnD = (target) => {
  withDnDStyle(target)
  withDnDGroup(target)
  withDnDList(target)
  withDnDItem(target)
};

export default withWatchDnD
