window.App.galleryTemplate = '<% _.each(images, function(image) { %>' +
  '<li class="gallery-grid-item">' +
    '<a class="gallery-grid-link" data-id="<%= image.id %>" href="/<%= image.gallery_slug %>/<%= image.id %>">' +
      '<img src="<%= image.thumbnail_url %>" alt="=<%= image.id %>" class="gallery-grid-image" />' +
    '</a>' +
  '</li>'  +
'<% }); %>';
