require_relative 'gallery_builder'
require 'digest/md5'
require 'mini_magick'

class GalleryImage
  attr_reader :file_name, :gallery_slug

  def initialize(file_name, gallery_slug)
    @file_name, @gallery_slug = file_name, gallery_slug
  end

  def to_hash
    {
      id: id
    }
  end

  def process_images
    sizes.each { |name, size| process(size) }
  end

  def create_page
    FileUtils.mkdir_p File.join(gallery_slug, id)
  end

  private

  def process(size)
    image = MiniMagick::Image.open(file_name)
    image.resize size
    actual_size = [image[:width], image[:height]].join('x')

    image.write target_filepath(actual_size)
  end

  def target_filepath(size)
    "#{File.join [processed_path, gallery_slug, target_filename(size)]}.jpg"
  end

  def target_filename(size)
    cache_bust = file.mtime.to_i
    [id, cache_bust, size].join(seperator)
  end

  def sizes
    GalleryBuilder.image_config['sizes']
  end

  def id
    Digest::MD5.hexdigest File.basename(file).split('-')[1]
  end

  def file
    @_file ||= File.new(file_name)
  end

  def processed_path
    GalleryBuilder.image_config['processed_path']
  end

  def seperator
    GalleryBuilder.image_config['file_name_seperator']
  end

end
