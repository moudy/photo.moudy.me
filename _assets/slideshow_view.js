window.App.SlideshowView = Backbone.View.extend({
  imageMargin: {
    top: 20
  , left: 20
  , right: 20
  , bottom: 20
  }

, initialize: function () {
    this.$window = $(window);
    this.$window.on('resize', _.throttle(this.onResize.bind(this), 100));
    this.$img = this.$('.image-slideshow-image');
    this.$menu = this.$('#image-slideshow-menu'),

    this.listenTo(this.model, 'change:imageId', this.onImageIdChange);
    this.listenTo(App.imageLoader, 'loading', this.onLoading);
    this.listenTo(App.imageLoader, 'loaded', this.onLoaded);

    new App.SlideshowMenuView({
      el: this.$menu,
      model: this.model
    });

    if (this.model.currentImage()) setTimeout(this.positionImage.bind(this), 0);
  }

, onLoaded: function () {
    this._loading = false;
    this.$el.removeClass('is-loading');
  }

, onLoading: function () {
    this._loading = true;

    setTimeout(function () {
      if (this._loading) this.$el.addClass('is-loading');
    }.bind(this), 100)
  }

, onResize: function () {
    delete this._mesuremants;
    if (this.model.currentImage()) this.positionImage();
  }

, events: {
    'click .image-slideshow-image': 'onGalleryImageClick'
  }

, onGalleryImageClick: function () {
    this.model.nextImage();
  }

, onImageIdChange: function (state, imageId) {
    if (imageId) this.showImage(imageId);
    this.$el.toggleClass('active', !!imageId);
  }

, showImage: function (imageId) {
    var image = this.collection.get(imageId);
    this.$img.hide();

    App.imageLoader.load(image, 'medium_url', function (model, url) {
      this.positionImage(model, this.$img.attr('src', url));
    }.bind(this));
  }

, measurements: function () {
    if (this._mesuremants) return this._mesuremants;

    var imageMargin = this.imageMargin
      , windowWidth = this.$el.outerWidth()
      , windowHeight = this.$el.outerHeight();

    var m = {
      menuHeight: this.$menu.outerHeight()
    , canvasWidth: windowWidth - (imageMargin.right + imageMargin.left)
    , windowWidth: windowWidth
    , windowHeight: windowHeight
    };

    m.canvasHeight = (windowHeight - m.menuHeight) - (imageMargin.top + imageMargin.bottom);

    this._measurements = m;
    return m;
  }

, canvasRatio: function () {
    var m = this.measurements();
    return m.canvasWidth / m.canvasHeight;
  }

, windowRatio: function () {
    var m = this.measurements();
    return m.windowWidth / m.canvasHeight;
  }

, _fullscreenCSS: function (model) {
    var m = this.measurements()
      , imageDimensions = model.dimensions()
      , height = m.windowHeight
      , width = m.windowWidth
      , top = 0
      , left = 0
      , targetWidth = model.widthFromHeight(height)
      , targetHeight = model.heightFromWidth(width)
      , css;

    if (targetWidth < width) {
      css = {
        width: width + 'px'
      , height: 'auto'
      , top: Math.round(top + (height / 2) + - (targetHeight / 2)) + 'px'
      , left: 0 + 'px'
      };
    } else {
      css = {
        width: 'auto'
      , height: height + 'px'
      , top: 0
      , left: Math.round(left + (width / 2) - (targetWidth / 2)) + 'px'
      };
    }


    if (this.model.isDark()) {
      css.top = 'auto'
      css.bottom = 0;
    } else {
      css.bottom = 'auto'
    }


    return css;
  }

, _normalCSS: function (model) {
    var m = this.measurements()
      , imageDimensions = model.dimensions()
      , height = m.canvasHeight
      , width = m.canvasWidth
      , top = 0 + this.imageMargin.top
      , left = 0 + this.imageMargin.left
      , targetWidth = model.widthFromHeight(height)
      , targetHeight = model.heightFromWidth(width)
      , css;

    if (this.canvasRatio() < model.ratio()) {
      css = {
        width: width + 'px'
      , height: 'auto'
      , top: Math.round(top + (height / 2) + - (targetHeight / 2)) + 'px'
      , left: left + 'px'
      };
    } else {
      css = {
        width: 'auto'
      , height: height + 'px'
      , top: top + 'px'
      , left: Math.round(left + (width / 2) - (targetWidth / 2)) + 'px'
      };
    }

    if (this.model.isDark()) {
      css.top = 'auto'
      css.bottom = m.menuHeight;
    } else {
      css.bottom = 'auto'
    }

    return css;
  }

, positionImage: function (model, $el) {
    model || (model = this.model.currentImage());
    $el || ($el = this.$img);

    var css = this._normalCSS(model);

    // TODO add fullscreen UI and logic
    //var css = this._fullscreenCSS(model);

    $el.css(css).show();
  }

});
