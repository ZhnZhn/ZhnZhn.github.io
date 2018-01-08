'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interact = require('interact.js');

var _interact2 = _interopRequireDefault(_interact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interact = {
  dragMoveListener: function dragMoveListener(event) {
    var target = event.target,
        dx = event.dx,
        dy = event.dy,
        style = target.style,
        _x = (parseFloat(target.getAttribute('data-x')) || 0) + dx,
        _y = (parseFloat(target.getAttribute('data-y')) || 0) + dy,
        _transform = 'translate(' + _x + 'px, ' + _y + 'px)';

    // translate the element


    Object.assign(style, {
      webkitTransform: _transform,
      transform: _transform
    });

    // update the posiion attributes
    target.setAttribute('data-x', _x);
    target.setAttribute('data-y', _y);
  },

  dragEndListener: function dragEndListener(event) {
    var target = event.target,
        style = target.style,
        left = style.left,
        top = style.top,
        x = parseFloat(target.getAttribute('data-x')) || 0,
        y = parseFloat(target.getAttribute('data-y')) || 0,
        _left = Number(left.replace('px', '')),
        _top = Number(top.replace('px', ''));


    Object.assign(style, {
      left: _left + x + 'px',
      top: _top + y + 'px',
      webkitTransform: '',
      transform: ''
    });

    target.setAttribute('data-x', 0);
    target.setAttribute('data-y', 0);

    /*
    let domHtml = document.getElementByTag('html');
    domHtml[0].style.cursor = 'default';
    */
  },

  makeDragable: function makeDragable(domNode) {
    (0, _interact2.default)(domNode).draggable({
      inertia: true,

      restrict: {
        restriction: document.getElementById('app'),
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },

      onmove: Interact.dragMoveListener,
      onend: Interact.dragEndListener
    }).preventDefault(false);
  }

};

exports.default = Interact;
//# sourceMappingURL=Interact.js.map