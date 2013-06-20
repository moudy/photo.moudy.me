class GalleryRender
  attr_reader :data

  def initialize(data)
    @data = data
  end

  def render
    Liquid::Template.parse(template).render view_data.merge(data)
  end

  def view_data
    GalleryBuilder.config['view']
  end

  private

  def template
    @_template ||= File.open("_templates/gallery.html", "rb").read
  end

end
