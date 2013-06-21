window.App.GalleryView = Backbone.View.extend({
  events: {
    'click a': 'onImageClick'
  }

, onImageClick: function (e) {
    e.preventDefault();
    var id = $(e.currentTarget).data('id');

    this.model.setImageById(id);
  }

});
