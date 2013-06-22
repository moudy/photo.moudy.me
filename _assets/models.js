window.App.Gallery = Backbone.Model.extend({
  idAttribute: 'slug'
});

window.App.Image = Backbone.Model.extend({
  path: function () {
    return [this.get('gallery_slug'), this.id].join('/');
  }

, gallery: function () {
    return App.galleries.get(this.get('gallery_slug'));
  }

, galleryName: function () {
    return this.gallery().get('name');
  }

, dimensionsString: function () {
    return this.get('medium_url').split('_')[2].replace('.jpg','');
  }

, widthFromHeight: function (height) {
    var d = this.dimensions()
      , w = (d.width * height) / d.height;

    return Math.round(w);
  }

, heightFromWidth: function (width) {
    var d = this.dimensions()
      , h = (d.height * width) / d.width;

    return Math.round(h);
  }

, dimensions: function () {
    var s = this.dimensionsString().split('x');

    return {
      width: s[0]
    , height: s[1]
    };
  }

, ratio: function () {
    var d = this.dimensions();

    return d.width / d.height;
  }

});

window.App.State = Backbone.Model.extend({
  initialize: function () {
    this.listenTo(this, 'change', this.onChange);
    this.$body = $('body');
  }

, isDark: function () {
    return !!Backbone.history.location.pathname.match("darkness");
  }

, onChange: function (self, gallery) {
    Backbone.history.navigate(this.path());

    this.$body.toggleClass('theme-dark', this.isDark());
  }

, setImageById: function (id) {
    var model = App.images.get(id);

    this.set({ imageId: model.id });
  }

, path: function () {
    var parts = [];

    if (this.get('gallery')) parts.push(this.get('gallery'));

    if (this.get('imageId')) {
      parts = [];
      parts.push(this.currentImage().get('gallery_slug'));
      parts.push(this.get('imageId'));
    }

    return '/' + parts.join('/');
  }

, currentImages: function () {
    var images;

    if (this.get('gallery')) {
      images = App.images.where({ gallery_slug: this.get('gallery') });
    } else {
      images = App.images.models;
    }

    return images;
  }

, currentImage: function () {
    return App.images.get(this.get('imageId'));
  }

, currentGallery: function () {
    var gallery = App.galleries.get(this.get('gallery'));
    if (!gallery) gallery = App.galleries.where({ slug:'' })[0];

    return gallery;
  }

, currentImageIndex: function () {
    return this.currentImages().indexOf(this.currentImage());
  }

, nextImage: function () {
    this._changeImage(1);
  }

, previousImage: function () {
    this._changeImage(-1);
  }

, _changeImage: function (direction) {
    var currentImages = this.currentImages()
      , length = currentImages.length
      , nextIndex = this.currentImageIndex() + direction
      , image;

    if (nextIndex < 0) {
      nextIndex = length - 1;
    } else if (nextIndex >= length) {
      nextIndex = 0;
    }

    image = currentImages[nextIndex];

    this.setImageById(image.id);
  }

});
