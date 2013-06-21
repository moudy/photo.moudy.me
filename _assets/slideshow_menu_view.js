window.App.SlideshowMenuView = Backbone.View.extend({
  events: {
    'click .back-to-gallery': 'onBackToGallery'
  , 'click .next': 'onNext'
  , 'click .previous': 'onPrevious'
  }

, initialize: function () {
    this.listenTo(this.model, 'change:gallery', this.onGalleryChange);
    this.$imageSlideshowTitle = this.$('.image-slideshow-title');
  }

, onGalleryChange: function () {
    this.$imageSlideshowTitle.text(this.model.currentGallery().get('name'));
  }

, onNext: function (e) {
    e.preventDefault();
    this.model.nextImage();
  }

, onPrevious: function (e) {
    e.preventDefault();
    this.model.previousImage();
  }

, onBackToGallery: function (e) {
    e.preventDefault();
    this.model.unset('imageId');
  }

});
