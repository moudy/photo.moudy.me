require 'fileutils'
require_relative 'gallery_renderer'
require_relative 'gallery_builder'
require_relative 'gallery_image'

class Gallery
  attr_reader :folder

  def initialize(folder)
    @folder = folder
  end

  def process_images
    FileUtils.mkdir_p path
    images.map(&:process_images)
  end

  def create_page(payload)
    FileUtils.mkdir_p slug
    data = payload.merge({
      'images' => images.map(&:to_hash),
      'current_gallery' => self.to_hash(min: true)
    })


    File.open("#{slug}/index.html", 'w') do |f|
      render = GalleryRender.new(data)
      f.write render.render
    end

    images.map { |i| i.create_page(data) }
  end

  def to_hash(options = {})
    h = {
      'name' => name,
      'slug' => slug
    }

    unless options[:min]
      h.merge!({
        'count' => count,
        'image_names' => images.map(&:to_hash)
      })
    end

    h
  end

  def images
    @_images ||= image_names.map { |i| GalleryImage.new(i, slug) }
  end

  private

  def path
    File.join(GalleryBuilder.processed_image_path, slug)
  end

  def slug
    name.downcase.gsub(/[^a-z0-9\-_]+/, '-')
  end

  def image_names
    @_image_names ||= Dir[File.join(folder, '*.jpg')]
  end

  def count
    @_count ||= image_names.count
  end

  def name
    File.basename folder
  end

end


class SuperGallery
  def to_hash(options = {})
    h = {
      'name' => 'All Photos',
      'slug' => ''
    }
  end

  def create_page(options = {}); end

  def process_images; end

  def images; []; end
end
