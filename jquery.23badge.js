jQuery.fn.badge = function(config) {
  var elem = this;
  var sort_random = function() {
    return (Math.round(Math.random())-0.5);
  };

  jQuery.ajaxSetup({cache: true});

  var show_photos = function(data) {
    var photo_array = data.photos.photo;
    photo_array.sort(sort_random);
    var markup = $.map(photo_array.slice(0, config.number || 10), function(photo, index) {
      $("<img/>").attr("src",
        'http://www.23hq.com/{{server}}/{{filename}}'
          .replace(/{{server}}/, photo.server)
          .replace(/{{filename}}/, [photo.id, photo.secret, 's'].join('_')+'.jpg'))
        .attr("alt", photo.title)
        .attr("title", photo.title)
        .attr("class", "badge-photo")
        .appendTo(elem.selector)
        .wrap('<a href="http://www.23hq.com/{{user}}/photo/{{photo}}"></a>'
          .replace(/{{user}}/, config.user_name)
          .replace(/{{photo}}/, photo.id)
        );
    });
  };

  jQuery.getJSON('http://www.23hq.com/services/rest?user_id='+config.user_id+'&method=flickr.people.getPublicPhotos&format=json&jsoncallback=?', show_photos);
};
