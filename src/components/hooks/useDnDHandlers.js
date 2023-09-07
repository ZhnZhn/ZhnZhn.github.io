import { bindTo } from '../uiApi';

const useDnDHandlers = ({
  isDraggable,
  option,
  onDragStart,
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave
}) => isDraggable
  ? {
      draggable: true,
      onDragStart: bindTo(onDragStart, option),
      onDrop: bindTo(onDrop, option),
      onDragEnter,
      onDragOver,
      onDragLeave
    }
  : void 0;

export default useDnDHandlers
