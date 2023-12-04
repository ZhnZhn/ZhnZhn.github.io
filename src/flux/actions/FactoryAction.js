import {
  showBrowser
} from '../stores/browserStore';
import {
  loadItemByQuery
} from '../stores/itemStore';

export const loadFromQuery = (option={}) => {
  setTimeout(() => {
    showBrowser(option)
  }, 100)
  setTimeout(() => {
    loadItemByQuery(option)
  }, 800)
}
