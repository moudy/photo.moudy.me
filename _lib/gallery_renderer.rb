class GalleryRender
  attr_reader :data

  def initialize(data)
    @data = data
  end

  def render
    Liquid::Template.parse(template).render view_data.merge(data)
  end

  def view_data
    page_title = ['Moudy', 'Photography']

    if current_gallery = data['current_gallery']
      page_title.unshift current_gallery['name']
    end

    GalleryBuilder.config['view'].merge({
      'page_title' => page_title.join(' | ')
    })
  end

  private

  def template
    @_template ||= File.open("_templates/gallery.html", "rb").read
  end

end
