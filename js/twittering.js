window.twttr = (function (d,s,id) {
  var t, js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
  js.src="https://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
  return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
}(document, "script", "twitter-wjs"));

window.twttr.ready(function (twttr) {
  twttr.widgets.createTimeline(
    '428710801998753792',
    document.getElementById('timeline'),
    function (el) {
      el.height = 400;

      var doc = el.contentDocument;
      var docEl = doc.documentElement;

      var style = doc.createElement('style');
      style.innerHTML = "\
::selection { background: #778899 !important; color: #c4e8e4; }\
* { font-family: 'omnes-pro' !important; color: #0066ff !important; }\
.dark * { color: #c4e8e4 !important; }\
.avatar, .full-name, .permalink, .p-nickname:before,\
.footer, .tweet .retweet-credit, .inline-media { display: none; }\
.var-narrow .tweet .header { padding-left: 12px; min-height: 0px;}\
.e-entry-content { padding-left: 16px; }\
.var-narrow.var-chromeless .tweet { padding-bottom: 0px; }\
.tweet.with-expansion { cursor: auto; }";

      docEl.appendChild(style);

      doc.defaultView.addEventListener('message', function (evt) {
        el.parentElement.classList.add('loaded');
      });

      var script = doc.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = "(function() {var config = {kitId: 'qgp0rxp'}; var d = false; var tk = document.createElement('script'); tk.src = '//use.typekit.net/' + config.kitId + '.js'; tk.type = 'text/javascript'; tk.async = 'true'; tk.onload = tk.onreadystatechange = function() {var rs = this.readyState; if (d || rs && rs != 'complete' && rs != 'loaded') return; d = true; try { Typekit.load(config); document.defaultView.postMessage('loaded', '*')} catch (e) {} };       document.defaultView.addEventListener('message', function (evt) {\
if (evt.data === 'dark') {\
document.body.classList.toggle('dark');\
}\
});\
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tk, s); })();";

      docEl.appendChild(script);
    },
    {
      chrome: 'noheader nofooter noborders transparent noscrollbar'
    });
});
