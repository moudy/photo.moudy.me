require 'mustache'

class GalleryRender
  attr_reader :data

  def initialize(data)
    @data = data
  end

  def render
    Mustache.render(template, images: data)
  end

  private

  def template
    @_template ||= File.open("_templates/gallery.mustache", "rb").read
  end

end
