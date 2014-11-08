/* global _ */

(function () {
  'use strict';

  var spanners = require('spanners');
  var toArray = Function.call.bind(Array.prototype.slice);

  var html = document.querySelector('html');
  var height = html.getBoundingClientRect().height;

  console.log(height);

  var isFalling = false;
  var timeOut;

  var calculateDrop = function (span, isFalling) {
    var delta = height - (span.getBoundingClientRect().top + span.offsetHeight);

    var drop = {
      isFalling: isFalling,
      delta: delta,
      duration: (delta / height) * 500,
      span: span
    };

    console.log(drop);

    return drop;
  };

  var applyStyles = function (drop) {
    var style = drop.span.style;

    var transform = 'translateY(' + drop.delta + 'px)';

    style.mozTransform = transform;
    style.msTransform = transform;
    style.webkitTransform = transform;
    style.transform = transform;

    var transition = 'transform ' + drop.duration + 'ms';

    style.mozTransition = '-moz-' + transition;
    style.msTransition = '-ms-' + transition;
    style.webkitTransition = '-webkit-' + transition;
    style.transition = transition;
  };

  var clearStyles = function (drop) {
    var style = drop.span.style;
    style.mozTransform = '';
    style.msTransform = '';
    style.webkitTransform = '';
    style.transform = '';
  };

  var dropIt = function (drop) {
    if (drop.falling) { return; }
    drop.falling = true;
    applyStyles(drop);
  };

  //////////////////////////////////////////

  var fallers = toArray(document.getElementsByClassName('fallers'));
  fallers.forEach(function (node) {
    node.parentNode.replaceChild(spanners.squirrel(node), node);
  });

  /* Querying the document again, so that we have fresh access to the
     <span>s, I didn't need to do it in the previous commit, wherein
     this code was in script.js */

  fallers = toArray(document.getElementsByClassName('fallers'));

  var spans = [];
  fallers.forEach(function (faller) {
    spans = spans.concat(toArray(faller.getElementsByTagName('span')));
  });

  var drops = spans.map(function (span) {
    return calculateDrop(span, false);
  });

  window.addEventListener('resize', _.debounce(function (event) {

    height = html.getBoundingClientRect().height;

    console.log(height);

    drops = drops.map(function (drop) {
      drop = calculateDrop(drop.span, drop.isFalling);

      if (drop.isFalling) {
        applyStyles(drop);
      }

      return drop;
    });
  }, 200, { trailing: true }));

  var danger = document.getElementsByClassName('danger')[0];

  danger.addEventListener('click', function () {

    danger.classList.toggle('dripping');

    if ( ! isFalling ) {
      isFalling = true;

      var all = _.shuffle(_.range(drops.length));

      var dropOne = function () {
        if (all.length) {
          dropIt(drops[all.shift()]);
          timeOut = window.setTimeout(dropOne, 50);
        }
      };

      dropOne();

    } else {
      isFalling = false;

      window.clearTimeout(timeOut);

      drops.forEach(function (drop, idx) {
        drop.falling = false;
        clearStyles(drop);
      });
    }
  });
})();
