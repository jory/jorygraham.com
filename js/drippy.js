/* global $,_ */

(function () {
  'use strict';

  var spanners = require('spanners');
  var toArray = Function.call.bind(Array.prototype.slice);

  var isFalling = false;

  var fallers = toArray(document.getElementsByClassName('fallers'));

  fallers.forEach(function (node) {
    node.parentNode.replaceChild(spanners.squirrel(node), node);
  });

  /* Querying the document again, so that we have fresh access to the
     <span>s, I didn't need to do it in the previous commit, wherein
     this code was in script.js */

  fallers = toArray(document.getElementsByClassName('fallers'));
  var $spans = [];

  for (var i = 0; i < fallers.length; ++i) {
    var faller = fallers[i];
    $spans = $spans.concat(toArray(faller.getElementsByTagName('span')));
  }

  var positions = _.map($spans, function (span) {
    var parentHeight = span.offsetParent.offsetHeight;
    var delta = parentHeight - (span.offsetTop + span.offsetHeight);

    return {
      falling: false,
      delta: delta,
      duration: (delta / parentHeight) * 500
    };
  });

  var dropIt = function(set) {
    _(set).each(function(index) {
      var position = positions[index];

      if (position.falling) {
        return;
      }

      position.falling = true;

      var style = $spans[index].style;
      style.webkitTransform = 'translateY(' + position.delta + 'px)';
      style.webkitTransition = '-webkit-transform ' + position.duration + 'ms';
    });
  };

  var danger = document.getElementsByClassName('danger')[0];
  var timeOut;

  danger.addEventListener('click', function () {

    danger.classList.toggle('dripping');

    if ( ! isFalling ) {
      isFalling = true;

      var all = _.shuffle(_.range($spans.length));
      var dropOne = function () {
        if (all.length) {
          dropIt([all.shift()]);
          timeOut = setTimeout(dropOne, 50);
        }
      };
      dropOne();

    } else {
      isFalling = false;

      clearTimeout(timeOut);

      $spans.forEach(function (span, idx) {
        positions[idx].falling = false;
        span.style.webkitTransform = '';
      });
    }
  });
})();
