window.App.SlideshowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'change:imageId', this.onImageIdChange);
  }

, onImageIdChange: function (state, imageId) {
    this.$el.toggleClass('active', !!imageId);
  }

});
