require_relative 'gallery_builder'
require 'digest/md5'
require 'mini_magick'

class GalleryImage
  attr_reader :file_name, :gallery

  def initialize(file_name, gallery)
    @file_name, @gallery = file_name, gallery
  end

  def to_hash
    {
      file_name: file_name
    }
  end

  def build
    sizes.each { |name, size| process(size) }
  end

  def process(size)
    image = MiniMagick::Image.open(file_name)
    image.resize size
    actual_size = [image[:width], image[:height]].join('x')

    image.write target_filename(actual_size)
  end

  def target_filename(size)
    cache_bust = file.mtime.to_i
    target_name = [id, cache_bust, size].join(seperator)

    "#{File.join [processed_path, gallery.slug, target_name]}.jpg"
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
