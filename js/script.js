(function () {
  'use strict';

  var isDark = false;

  function changeTitle () {
    var titles = ['I didn\'t know what to title this page.',
                  'Rogueliker',
                  'Mobile Web Developer',
                  'Amateur Wordsmith',
                  'Emacs Acolyte',
                  'Cat Enthusiast'];

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
    var images = document.querySelectorAll('.headshot object, .headshot img');
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
})();
