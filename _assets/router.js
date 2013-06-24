window.App.Router = Backbone.Router.extend({
  routes: {
    '(:gallery)(/:imageId)': 'onRoute'
  }

, onRoute: function (gallery, imageId) {
    App.state.set({ gallery: gallery, imageId: imageId });
  }

});
