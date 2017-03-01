'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _interact = require('interact.js');

var _interact2 = _interopRequireDefault(_interact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Interact = {};

Interact.dragMoveListener = function (event) {
    var target = event.target,

    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
};

Interact.dragEndListener = function (event) {
    var target = event.target,
        x = parseFloat(target.getAttribute('data-x')) || 0,
        y = parseFloat(target.getAttribute('data-y')) || 0,
        left = Number(target.style.left.replace('px', '')),
        top = Number(target.style.top.replace('px', ''));

    target.style.left = left + x + 'px';
    target.style.top = top + y + 'px';

    target.style.webkitTransform = target.style.transform = '';

    target.setAttribute('data-x', 0);
    target.setAttribute('data-y', 0);

    /*
    let domHtml = document.getElementByTag('html');
    domHtml[0].style.cursor = 'default';
    */
};

Interact.makeDragable = function (domNode) {
    (0, _interact2.default)(domNode).draggable({
        inertia: true,
        /*
        restrict: {
          restriction: "parent",
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        */
        onmove: Interact.dragMoveListener,
        onend: Interact.dragEndListener }).preventDefault(false);
};

exports.default = Interact;
//# sourceMappingURL=Interact.js.map