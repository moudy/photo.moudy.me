require_relative 'gallery_builder'
require_relative 'gallery_renderer'
require 'digest/md5'
require 'mini_magick'

class GalleryImage
  attr_reader :file_name, :gallery_slug

  def initialize(file_name, gallery_slug)
    @file_name, @gallery_slug = file_name, gallery_slug
  end

  def to_hash
    {
      'id' => id,
      'gallery_slug' => gallery_slug
    }.merge(urls)
  end

  def process_images
    sizes.each { |name, size| process(name, size) }
  end

  def create_page
    FileUtils.mkdir_p File.join(gallery_slug, id)

    File.open("#{gallery_slug}/#{id}/index.html", 'w') do |f|
      render = GalleryRender.new('image' => self.to_hash)
      f.write render.render
    end
  end

  private

  def processed_filenames
    @_processed_filenames ||= begin
      f = Dir.glob("#{File.join [processed_path, gallery_slug, id]}*")

      # TOTALY INSANE WAY TO ORDER BY SIZE (but it works)
      f.sort_by do |a|
        a = a.split(seperator).last
        - a.split('x').join('').to_i
      end
    end
  end

  def urls
    result = {}

    sizes.each_with_index do |(name, _), index|
      result["#{name}_url"] = '/' + processed_filenames[index]
    end

    result
  end

  def process(name, size)
    image = MiniMagick::Image.open(file_name)
    image.resize size
    actual_size = [image[:width], image[:height]].join('x')

    image.write target_filepath(actual_size)
  end

  def target_filepath(size)
    "#{File.join [processed_path, gallery_slug, target_filename(size)]}.jpg"
  end

  def target_filename(size)
    cache_bust = source_file.mtime.to_i
    [id, cache_bust, size].join(seperator)
  end

  def sizes
    GalleryBuilder.image_config['sizes']
  end

  def id
    Digest::MD5.hexdigest File.basename(source_file).split('-')[1]
  end

  def source_file
    @_source_file ||= File.new(file_name)
  end

  def processed_path
    GalleryBuilder.image_config['processed_path']
  end

  def seperator
    GalleryBuilder.image_config['file_name_seperator']
  end

end
