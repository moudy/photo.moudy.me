window.App.Gallery = Backbone.Model.extend({
  idAttribute: 'slug'
});

window.App.Image = Backbone.Model.extend({
  path: function () {
    return [this.get('gallery_slug'), this.id].join('/');
  }
});

window.App.State = Backbone.Model.extend({
  initialize: function () {
    this.listenTo(this, 'change', this.onChange);
  }

, onChange: function (self, gallery) {
    Backbone.history.navigate(this.path());
  }

, setImageById: function (id) {
    var model = App.images.get(id);

    this.set({
      gallery: model.get('gallery_slug')
    , imageId: model.id
    })
  }

, path: function () {
    var parts = [];

    if (this.get('gallery')) parts.push(this.get('gallery'));
    if (this.get('imageId')) parts.push(this.get('imageId'));

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
    return App.galleries.get(this.get('gallery'));
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
