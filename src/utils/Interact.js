
import interact from 'interactjs'

const Interact = {
  dragMoveListener: function(event){
    const { target, dx, dy } = event
        , style = target.style
        // keep the dragged position in the data-x/data-y attributes
        , _x = (parseFloat(target.getAttribute('data-x')) || 0) + dx
        , _y = (parseFloat(target.getAttribute('data-y')) || 0) + dy
        , _transform = 'translate(' + _x + 'px, ' + _y + 'px)';

    // translate the element
      Object.assign(style, {
        webkitTransform: _transform,
        transform: _transform
      })

      // update the posiion attributes
      target.setAttribute('data-x', _x)
      target.setAttribute('data-y', _y)
  },

  dragEndListener: function(event){
      const target = event.target
          , style = target.style
          , { left, top } = style
          , x = (parseFloat(target.getAttribute('data-x')) || 0)
          , y = (parseFloat(target.getAttribute('data-y')) || 0)
          , _left = Number(left.replace('px',''))
          , _top = Number(top.replace('px', ''));

      Object.assign(style, {
        left: (_left + x) + 'px',
        top: (_top + y) + 'px',
        webkitTransform: '',
        transform: ''
      })

      target.setAttribute('data-x', 0)
      target.setAttribute('data-y', 0)

      /*
      let domHtml = document.getElementByTag('html');
      domHtml[0].style.cursor = 'default';
      */
  },

  makeDragable: function(domNode){
    interact(domNode)
     //.ignoreFrom('[data-scrollable]')
     .draggable({
        ignoreFrom: '[data-scrollable]',
        inertia: true,

        restrict: {
          restriction: document.getElementById('app'),
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },

        onmove: Interact.dragMoveListener,
        onend: Interact.dragEndListener
      })
      .preventDefault(false)
  }

};

export default Interact
