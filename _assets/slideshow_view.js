window.App.SlideshowView = Backbone.View.extend({
  initialize: function () {
    this.$img = this.$('.gallery-image');
    this.listenTo(this.model, 'change:imageId', this.onImageIdChange);

    new App.SlideshowMenuView({
      el: this.$('#image-slideshow-menu'),
      model: this.model
    });
  }

, onImageIdChange: function (state, imageId) {
    this.$el.toggleClass('active', !!imageId);

    if (imageId) {
      var image = this.collection.get(imageId);
      this.$img.attr('src', image.get('medium_url'));
    }
  }

});
