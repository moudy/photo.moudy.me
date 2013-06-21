var domReady = function () {
  App.state = new App.State();
  App.images = new App.Images(App.data.images);

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

  Backbone.history.start({ pushState: true });
};

$(domReady);
