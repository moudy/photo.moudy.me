var domReady = function () {
  var state = new App.State();
  new App.HeaderView({ el: '#header', model: state });
};

$(domReady);
