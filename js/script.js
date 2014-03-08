(function () {
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
    isDark = ! isDark;

    link.setAttribute('href', href);

    var oldLink = document.querySelector("link[rel='shortcut icon']");
    if (oldLink) {
      oldLink.parentNode.removeChild(oldLink);
    }

    document.querySelector('head').appendChild(link);
  }

  var toggle = document.getElementsByClassName('toggle')[0];
  var isDark = false;

  toggle.addEventListener('click', function () {
    document.body.parentElement.classList.toggle('dark');

    changeFavico();

    var iframe = document.querySelector('iframe');
    iframe.contentDocument.defaultView.postMessage('dark', '*');

    changeTitle();
  });
})();
