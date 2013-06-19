require 'fileutils'
require_relative 'gallery_render'
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

  def create_page
    FileUtils.mkdir_p slug

    File.open("#{slug}/index.html", 'w') do |f|
      render = GalleryRender.new images.map(&:to_hash)
      f.write render.render
    end

    images.map(&:create_page)
  end

  def to_hash
    {
      name: name,
      slug: slug,
      count: count,
      image_names: images.map(&:to_hash)
    }
  end

  private

  def path
    File.join(GalleryBuilder.processed_image_path, slug)
  end

  def slug
    name.downcase.gsub(/[^a-z0-9\-_]+/, '-')
  end

  def images
    @_images ||= image_names.map { |i| GalleryImage.new(i, slug) }
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


