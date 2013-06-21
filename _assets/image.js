window.App.Image = Backbone.Model.extend({
  path: function () {
    return [this.get('gallery_slug'), this.id].join('/');
  }
});
