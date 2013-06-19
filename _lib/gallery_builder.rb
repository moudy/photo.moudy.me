require 'jekyll'
require_relative 'gallery'

class GalleryBuilder

  def process_images
   galleries.map(&:process_images)
  end

  def create_pages
    galleries.map(&:create_page)
  end

  def self.config
    @_config ||= Jekyll.configuration({})
  end

  def self.image_config
    GalleryBuilder.config['images']
  end

  def self.raw_image_path
    File.join GalleryBuilder.config['source'], GalleryBuilder.image_config['raw_path']
  end

  def self.processed_image_path
    File.join GalleryBuilder.config['source'], GalleryBuilder.image_config['processed_path']
  end

  private

  def galleries
    @_galleries ||= folders.map { |f| Gallery.new(f) }
  end

  def folders
    @_folders ||= Dir.glob("#{GalleryBuilder.raw_image_path}/*").select { |f| File.directory?(f) }
  end

end


