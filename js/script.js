(function () {
  window.isDark = false;

  function changeTitle () {
    var titles = ["I didn't know what to title this page.",
                  "Rogueliker",
                  "Mobile Web Developer",
                  "Amateur Wordsmith",
                  "Emacs Acolyte"];

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

    var oldLink = document.querySelector("link[rel='shortcut icon']");
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
  };

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

  document.addEventListener('click', function () {
    Object.prototype.forEach = Array.prototype.forEach;
    Object.prototype.reduce = Array.prototype.reduce;
    Object.prototype.slice = Array.prototype.slice;

    var fallers = document.getElementsByClassName('fallers');

    var queue = fallers.reduce(function (output, faller) {
      return output.concat(faller.children.slice());
    }, []);

    var item;

    while (item = queue.pop()) {

      // childNodes vs. children
      // text nodes and empty tags.

      console.log(item);

      var childNodes = item.childNodes.slice();

      childNodes.forEach(function (node) {
        console.log(node);

        switch (node.nodeType) {
          case Node.TEXT_NODE: {
            var div = document.createElement('div');
            div.classList.add('TEXT');
            div.innerHTML = node.textContent.replace(/(\S)/g, "<span>$1</span>");
            item.replaceChild(div, node);
            break;
          }
          default: {
            queue.push(node);
            break;
          }
        }
      });
    }

    var spans = [];

    for (var i = 0; i < fallers.length; ++i) {
      var faller = fallers[i];
      spans = spans.concat([].slice.call(faller.getElementsByTagName('span')));
    }

    spans.forEach(function (span) {
      var style = span.style;
      var diff = span.offsetParent.clientHeight - span.offsetTop - span.offsetHeight;

      style.webkitTransition = 'transform ' + (span.offsetParent.clientHeight / diff * 1000) + 'ms';
      style.webkitTransform = 'translateY(' + diff + 'px)';
    });
  });
})();
