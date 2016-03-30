//===============================
//! dynamically add Vimeo videos
//===============================
var feed = 'channel/staffpicks';

$.getJSON('https://vimeo.com/api/v2/' + feed + '/videos.json', function (data) {
  var videocount = 9; // number of videos to get
  var output = '';    // create an empty output variable

  // loop through objects
  for (var i = 0; i < videocount ; i++) {

    // gather values from JSON feed and assign to variables
    var title = data[i].title;
    var thumbnail = data[i].thumbnail_large;
    var url = data[i].url;

    // create markup and append to output variable
    output += '<article class="portfolio-item">';
    output += '<a href="' + url + '" class="video-popup" title="' + title + '">';
    output += '<img src="' + thumbnail + '" alt="' + title + '">';
    output += '<h3 class="portfolio-item__title">' + title + '</h3>';
    output += '</a>';
    output += '</article>';
  } // end portfolio loop

  $('#portfolio').html(output); // inject content and markup into DOM
});

//=================
//! magnific popup
//=================
$(document).ready(function() {

  // bind click event to #portfolio element
  $('#portfolio').on('click', '.video-popup', function(e) {

    // don't need to go to Vimeo site, so stop default click behavior
    e.preventDefault();

    $(this).magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      iframe: {
        markup: '<div class="mfp-iframe-scaler">'+
                  '<div class="mfp-close"></div>'+
                  '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                  '<div class="mfp-title">Some caption</div>'+
                '</div>'
      },
      callbacks: {
        markupParse: function(template, values, item) {
         values.title = item.el.attr('title');
        }
      }
    }).magnificPopup('open');
  });
});