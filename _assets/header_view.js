window.App.HeaderView = Backbone.View.extend({
  initialize: function () {
    this.$window = $(window);
    this.$window.on('scroll', _.throttle(this.onScroll.bind(this), 10));
    this.listenTo(this.model, 'change:gallery', this.onGalleryChange)
  }

, events: {
    'click a': 'onGalleryClick'
  }

, onGalleryClick: function (e) {
    e.preventDefault();
    var slug = $(e.currentTarget).data('slug');

    this.model.set({
      gallery:slug
    , imageId:null
    });
  }

, onGalleryChange: function (state, slug) {
    this.$('.active').removeClass('active');
    this.$('[data-slug="' + slug + '"]').addClass('active');
  }

, onScroll: function(e) {
    var isFixed = this.$window.scrollTop() >= this.galleryMenuTopOffset();
    this.$galleryMenu().toggleClass('fixed', isFixed);
  }

, $galleryMenu: function () {
    return this._$galleryMenu || (this._$galleryMenu = this.$('.gallery-menu'));
  }

, galleryMenuTopOffset: function () {
    return this._galleryMenuTopOffset || (this._galleryMenuTopOffset = this.$galleryMenu().offset().top);
  }

});
