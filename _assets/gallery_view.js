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
    var css;
    if (imageId) {
      css = { overflow: 'hidden', height: '100%' };
    } else {
      css = { overflow: 'scroll', height: 'auto' };
      this.render();
    }

    this.$htmlBody.css(css);
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
    this.$el.html(html);

    return this;
  }

});
