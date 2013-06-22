window.App.SlideshowMenuView = Backbone.View.extend({
  events: {
    'click .back-to-gallery': 'onBackToGallery'
  , 'click .next': 'onNext'
  , 'click .previous': 'onPrevious'
  }

, initialize: function () {
    this.listenTo(this.model, 'change:gallery', this.onGalleryChange);
    this.$imageSlideshowTitle = this.$('.image-slideshow-title');
    $(document).keydown(this.onKeyDown.bind(this));
  }

,  onKeyDown: function (e) {
      if (!this.model.currentImage()) return;

      if (e.keyCode == 37) this.model.previousImage();
      if (e.keyCode == 39) this.model.nextImage();
      if (e.keyCode == 27) this.model.unset('imageId');
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
