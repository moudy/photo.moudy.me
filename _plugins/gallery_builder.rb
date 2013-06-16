require 'jekyll'

class GalleryImage
  attr_reader :file_name

  def initialize(file_name)
    @file_name = file_name
  end

  def to_hash
    {
      file_name: file_name
    }
  end

end

class Gallery
  attr_reader :folder

  def initialize(folder)
    @folder = folder
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

  def images
    @_images ||= image_names.map { |i| GalleryImage.new(i) }
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

  def slug
    name.downcase.gsub(/[^a-z0-9\-_]+/, '-')
  end

end


class GalleryBuilder

  def build
    galleries.map(&:to_hash)
  end

  private

  def galleries
    @_galleries ||= folders.map { |f| Gallery.new(f) }
  end

  def folders
    @_folders ||= Dir.glob("#{raw_image_path}/*").select { |f| File.directory?(f) }
  end

  def config
    @_config ||= Jekyll.configuration({})
  end

  def raw_image_path
    File.join config['source'], config['raw_image_path']
  end

  def processed_image_path
    File.join config['source'], config['processed_image_path']
  end

end


# TOTO - improve
#module Photo
  #module Utils
    #def self.parameterize(string, sep = '-')
      #string.downcase.gsub(/[^a-z0-9\-_]+/, sep)
    #end
  #end
#end

  #directories = Dir.glob("#{SOURCE_IMAGE_PATH}/*").select { |f| File.directory?(f) }
  #directories.each do |dir|
    #dir_path = "#{DESTINATION_IMAGE_PATH}/#{Photo::Utils.parameterize File.basename(dir)}"
    #FileUtils.mkdir_p(dir_path) unless File.exists?(dir_path)
  #end
