window.App.HeaderView = Backbone.View.extend({
  initialize: function () {
    this.$window = $(window);
    this.$window.on('scroll', _.throttle(this.onScroll.bind(this), 10));
    this.$galleryMenuName = this.$('.gallery-menu-name');
    this.listenTo(this.model, 'change:gallery', this.onGalleryChange)
  }

, events: {
    'click .title-link': 'onGalleryClick',
    'click .gallery-menu-link': 'onGalleryClick',
    'click .gallery-menu-dropdown-button': 'onGalleryMenuDropdownButton'
  }

, onGalleryMenuDropdownButton: function (e) {
    e.preventDefault();
    this.$el.toggleClass('open');
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
    this.$el.removeClass('open');
    this.$galleryMenuName.text(state.currentGallery().get('name'));
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
