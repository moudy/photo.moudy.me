window.App.GalleryView = Backbone.View.extend({
  events: {
    'click a': 'onImageClick'
  }

, initialize: function () {
    this.listenTo(this.model, 'change:gallery', this.render);
    this.listenTo(this.model, 'change:imageId', this.onImageIdChange);
    this.$htmlBody = $('html, body');
  }

, onImageIdChange: function (model, imageId) {
    if (!imageId && !this.$el.children().length) this.render();
  }

, onImageClick: function (e) {
    e.preventDefault();
    var id = $(e.currentTarget).data('id');

    this.model.setImageById(id);
  }

, template: _.template(App.galleryTemplate)

, render: function () {
    var models, gallery, html;

    if (gallery = this.model.get('gallery')) {
      models = this.collection.where({ gallery_slug: gallery });
    } else {
      models = _.shuffle(this.collection.models);
    }

    models = models.map(function (model) { return model.toJSON(); });

    html = this.template({ images: models });

    this.$el.fadeTo(50, 0, function () {
      this.$el.html(html).fadeTo(150, 1);
    }.bind(this));

    return this;
  }

});
