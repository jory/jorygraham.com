$(function () {
  $('p').each(function (idx, el) {
    el.innerHTML = el.textContent.replace(/(\S)/g, "<span>$1</span>");
  });

  var $spans = $('span');

  var positions = _.map($spans, function (span) {
    var $span = $(span);

    var offset = $span.offset();

    offset.width = $span.width();
    offset.height = $span.height();

    offset.right = offset.left + offset.width;

    return offset;
  });

  var length = positions.length;
  var innerHeight = window.innerHeight;
  var totalTime = 5000;

  var dropIt = function(set) {
    _(set).each(function(index) {
      var position = positions[index];

      if (position.falling) return;

      position.falling = true;

      var min = position.left;
      var max = position.right;

      var delta = innerHeight - (position.top + position.height);

      var style = $spans[index].style;
      style.webkitTransform = 'translateY(' + delta + 'px)';
      style.webkitTransition = '-webkit-transform ' + (innerHeight / delta) * totalTime + 'ms';

//       var underneath = [];
//       var under = false;
//       var top;

//       for (var i = (index + 1); i < length; i++) {
//         var candidate = positions[i];

//         var left = candidate.left;
//         var right = candidate.right;

//         if (min <= left && left < max) {
//           underneath.push(i);

//           under = true;
//           top = candidate.top;

//         } else if (min < right && right <= max) {
//           underneath.push(i);

//           under = true;
//           candidate.top;

//         } else if (under || top < candidate.top) {
//           break;
//         }
//       }

//       console.log(index, "->", underneath);

//       if (underneath.length) {
//         setTimeout(function(){
//           dropIt(underneath);
//         },0);
//       }

    })
  };

  $spans.each(function(idx, span) {
    $(span).on('mouseover', function() {
      dropIt([idx]);
    });
  });
});
