require 'jekyll'
require_relative 'gallery'

class GalleryBuilder

  def process_images
   galleries.map(&:process_images)
  end

  def create_pages
    payload = {
      'galleries' => galleries.map { |g| g.to_hash(min: true) }
    }

    galleries.map { |g| g.create_page payload }

    # add all images and shuffle
    data = payload.merge({
      'images' => galleries.map { |g| g.images.map(&:to_hash) }.flatten.shuffle
    })

    # create main page with all images
    File.open('index.html', 'w') do |f|
      render = GalleryRender.new(data)
      f.write render.render
    end
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

  def galleries
    @_galleries ||= folders.map { |f| Gallery.new(f) }
  end

  private

  def folders
    @_folders ||= Dir.glob("#{GalleryBuilder.raw_image_path}/*").select { |f| File.directory?(f) }
  end

end


