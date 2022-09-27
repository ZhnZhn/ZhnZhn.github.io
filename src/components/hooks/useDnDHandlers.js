
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
      onDragStart: onDragStart.bind(null, option),
      onDrop: onDrop.bind(null, option),
      onDragEnter,
      onDragOver,
      onDragLeave
    }
  : void 0;

export default useDnDHandlers
