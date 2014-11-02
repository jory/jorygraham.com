/* global $,_ */

(function () {
  'use strict';

  var spanners = require('spanners');
  var isDark = false;

  function changeTitle () {
    var titles = ['I didn\'t know what to title this page.',
                  'Rogueliker',
                  'Mobile Web Developer',
                  'Amateur Wordsmith',
                  'Emacs Acolyte'];

    document.title = titles[Math.floor(Math.random() * titles.length)];
  }

  changeTitle();

  function changeFavico () {
    var link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('type', 'image/png');

    var href = '';
    if ( ! isDark) {
      href = 'favicon-dark.ico';
    } else {
      href = 'favicon.ico';
    }
    link.setAttribute('href', href);

    var oldLink = document.querySelector('link[rel="shortcut icon"]');
    if (oldLink) {
      oldLink.parentNode.removeChild(oldLink);
    }

    document.querySelector('head').appendChild(link);
  }

  function changeImage () {
    var images = document.querySelectorAll('.headshot img');
    for (var i = 0, l = images.length; i < l; i++) {
      images[i].classList.toggle('foreground');
    }
  }

  var toggle = document.getElementsByClassName('toggle')[0];

  toggle.addEventListener('click', function () {
    document.body.parentElement.classList.toggle('dark');

    changeTitle();
    changeFavico();
    changeImage();

    isDark = ! isDark;

    var iframe = document.querySelector('iframe');
    iframe.contentDocument.defaultView.postMessage('dark', '*');
  });

    Object.prototype.forEach = Array.prototype.forEach;
    Object.prototype.reduce = Array.prototype.reduce;
    Object.prototype.slice = Array.prototype.slice;

    var fallers = document.getElementsByClassName('fallers');

    fallers.forEach(function (node) {
      node.parentNode.replaceChild(spanners.squirrel(node), node);
    });

    var $spans = [];

    for (var i = 0; i < fallers.length; ++i) {
      var faller = fallers[i];
      $spans = $spans.concat([].slice.call(faller.getElementsByTagName('span')));
    }


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
    _(set).each(function(index) {
      var position = positions[index];

      if (position.falling) {
        return;
      }

      position.falling = true;

      var delta = innerHeight - (position.top + position.height);

      var style = $spans[index].style;
      style.webkitTransform = 'translateY(' + delta + 'px)';
      style.webkitTransition = '-webkit-transform ' + (innerHeight / delta) * totalTime + 'ms';
    });
  };

  $spans.forEach(function(span, idx) {
    $(span).on('mouseover', function() {
      console.log("foo");
      dropIt([idx]);
    });
  });
})();
