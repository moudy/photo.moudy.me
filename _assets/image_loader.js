App.ImageLoader = Backbone.Model.extend({
  imageCache: {}

, initialize: function () {
    this.loader = document.createElement('img');
  }

, load: function (model, url_key, cb) {
    var url = model.get(url_key);

    if (this.imageCache[url]) setTimeout(function () { cb(model, url); }, 0);

    this.trigger('loading', model);

    this.loader.onload = function () {
      this.imageCache[url] = true;
      this.trigger('loaded', model, url);

      if (cb) cb(model, url);
    }.bind(this);

    this.loader.src = url;
  }

});

