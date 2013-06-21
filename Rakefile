#!/usr/bin/env ruby

require_relative '_lib/gallery_builder'

task :gallery_builder do
  puts 'new gallery builder'
  $gb = GalleryBuilder.new
end

task :process_images => :gallery_builder do
  puts 'processing images...'
  $gb.process_images
end

task :create_pages => :gallery_builder do
  puts 'creating pages...'
  $gb.create_pages
end

task :generate_json => :gallery_builder do
  puts 'generating json...'
  $gb.generate_json
end

task :build_site => [:process_images, :create_pages] do
end

task :default => :build_site
