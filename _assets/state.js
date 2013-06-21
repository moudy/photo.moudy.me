window.App.State = Backbone.Model.extend({
  initialize: function () {
    this.listenTo(this, 'change', this.onChange)
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

});
