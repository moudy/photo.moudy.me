class GalleryRender
  attr_reader :data

  def initialize(data)
    @data = data
  end

  def render
    Liquid::Template.parse(template).render data
  end

  private

  def template
    @_template ||= File.open("_templates/gallery.html", "rb").read
  end

end
