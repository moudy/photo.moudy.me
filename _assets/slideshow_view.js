window.App.SlideshowView = Backbone.View.extend({
  imageMargin: {
    top: 10
  , left: 10
  , right: 10
  , bottom: 10
  }

, initialize: function () {
    this.$window = $(window);
    this.$window.on('resize', _.throttle(this.onResize.bind(this), 100));
    this.$img = this.$('.image-slideshow-image');
    this.$menu = this.$('#image-slideshow-menu'),
    this.listenTo(this.model, 'change:imageId', this.onImageIdChange);

    new App.SlideshowMenuView({
      el: this.$menu,
      model: this.model
    });

    if (this.model.currentImage()) setTimeout(this.positionImage.bind(this), 0);
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

    var m = {
      menuHeight: this.$menu.outerHeight()
    , canvasWidth: this.$el.outerWidth()
    };

    m.canvasHeight = this.$el.outerHeight() - m.menuHeight;

    return this._measurements = m;
  }

, canvasRatio: function () {
    var m = this.measurements();
    return m.canvasWidth / m.canvasWidth;
  }

, positionImage: function (model, $el) {
    var m = this.measurements();

    model || (model = this.model.currentImage());
    $el || ($el = this.$img);

    this.canvasRatio();
    model.ratio();

    var height = m.canvasHeight - (this.imageMargin.top + this.imageMargin.bottom);
    var width = m.canvasWidth - (this.imageMargin.right + this.imageMargin.left);

    var css = {
      position:'absolute'
    , display: 'block'
    , top: 0 + this.imageMargin.top
    , left: 0 + this.imageMargin.left
    , height: height + 'px'
    , width: width + 'px'
    };

    $el.css(css).show();
  }

});
