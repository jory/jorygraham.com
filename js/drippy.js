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

  console.log($spans);

  var positions = _.map($spans, function (span) {
    var $span = $(span);

    var offset = $span.offset();

    offset.width = $span.width();
    offset.height = $span.height();

    offset.right = offset.left + offset.width;

    return offset;
  });

  var innerHeight = window.innerHeight;
  var totalTime = 5000;

  var dropIt = function(set) {
    console.log(set);

    _(set).each(function(index) {
      var position = positions[index];

      if (position.falling) {
        return;
      }

      position.falling = true;

      var delta = innerHeight - (position.top + position.height);

      var style = $spans[index].style;
      style.webkitTransform = 'translateY(' + delta + 'px)';
      style.webkitTransition = '-webkit-transform ' + (delta / innerHeight) * totalTime + 'ms';
    });
  };

  var danger = document.getElementsByClassName('danger')[0];
  danger.addEventListener('click', function () {
    isFalling = true;

    var all = _.shuffle(_.range($spans.length));

    var dropOne = function () {
      if (all.length) {
        dropIt([all.shift()]);
        setTimeout(dropOne, 200);
      }
    };

    dropOne();
  });
})();