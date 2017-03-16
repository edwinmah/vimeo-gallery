//===============================
//! dynamically add Vimeo videos
//===============================
var feed = 'channel/staffpicks';

$.getJSON('https://vimeo.com/api/v2/' + feed + '/videos.json', function(data) {
  var count  = 12;  // number of videos to get
  var output = ''; // create an empty output variable

  // loop through objects
  for (var i = 0; i < count ; i++) {

    // gather values from JSON feed and assign to variables
    var title     = data[i].title;
    var thumbnail = data[i].thumbnail_large;
    var videoUrl  = data[i].url;
    var author    = data[i].user_name;
    var authorUrl = data[i].user_url;

    // create markup and append to output variable
    output += '<article class="video">';
    output +=   '<a href="' + videoUrl + '" class="video-popup" title="' + title + '">';
    output +=     '<img src="' + thumbnail + '" alt="' + title + '">';
    output +=     '<h3 class="video-title">' + title + '</h3>';
    output +=   '</a>';
    output +=   '<p class="video-author">By ';
    output +=     '<a href="' + authorUrl + '">' + author + '</a>';
    output +=   '</p>';
    output += '</article>';
  } // end videos loop

  $('#videos').html(output); // inject content and markup into DOM
});

//=================
//! magnific popup
//=================
$(document).ready(function() {

  // bind click event to #videos element
  $('#videos').on('click', '.video-popup', function(e) {

    // don't need to go to Vimeo site, so stop default click behavior
    e.preventDefault();

    var output  = '<div class="mfp-iframe-scaler">';
        output +=   '<div class="mfp-close"></div>';
        output +=   '<iframe class="mfp-iframe" allowfullscreen></iframe>';
        output +=   '<div class="mfp-title">Some caption</div>';
        output += '</div>';

    $(this).magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      iframe: {
        markup: output
      },
      callbacks: {
        markupParse: function(template, values, item) {
          values.title = item.el.attr('title');
        }
      }
    }).magnificPopup('open');
  });
});










