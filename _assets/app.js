var domReady = function () {
  App.state = new App.State({
    gallery: window.App.bootstrap.gallery
  , imageId: window.App.bootstrap.imageId
  });

  App.images = new App.Images(App.data.images);
  App.galleries = new App.Galleries(App.data.galleries);
  App.imageLoader = new App.ImageLoader();

  new App.HeaderView({ el: '#header', model: App.state });
  new App.GalleryView({
    el: '#gallery'
  , model: App.state
  , collection: App.images
  });

  new App.SlideshowView({
    el: '#slideshow'
  , model: App.state
  , collection: App.images
  });

  var email = ['me', 'moudy.me'].join('@');
  $('#mailto-link').attr('href', 'mailto:' + email).text(email);

  Backbone.history.start({ pushState: true });
};

$(domReady);
