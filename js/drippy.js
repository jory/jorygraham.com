/* global _ */

(function () {
  'use strict';

  var spanners = require('spanners');
  var toArray = Function.call.bind(Array.prototype.slice);

  var html = document.querySelector('html');
  var height;

  var isFalling = false;
  var timeOut;

  var danger = document.getElementsByClassName('danger')[0];

  var calculateDrop = function (span, isFalling) {

    // getBoundingClientRect is viewport relative, so scrolling can
    // also impact it.

    var delta = height - (span.getBoundingClientRect().top + span.offsetHeight);

    var drop = {
      isFalling: isFalling,
      delta: delta,
      duration: 2000,
      span: span
    };

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

  var reset = function () {
    danger.classList.remove('dripping');

    isFalling = false;

    window.clearTimeout(timeOut);

    drops.forEach(function (drop) {
      drop.falling = false;
      clearStyles(drop);
    });
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

  var drops = [];

  window.addEventListener('resize', _.debounce(function () {
    height = html.getBoundingClientRect().height;
    reset();
    drops = drops.map(function (drop) {
      return calculateDrop(drop.span, drop.isFalling);
    });
  }, 200, { trailing: true }));

  danger.addEventListener('click', function () {

    if ( ! isFalling ) {
      danger.classList.add('dripping');

      isFalling = true;

      height = html.getBoundingClientRect().height;

      drops = spans.map(function (span) {
        return calculateDrop(span, false);
      });

      var all = _.shuffle(_.range(drops.length));

      var dropOne = function () {
        if (all.length) {
          dropIt(drops[all.shift()]);
          timeOut = window.setTimeout(dropOne, 50);
        }
      };

      dropOne();

    } else {
      reset();
    }
  });
})();
