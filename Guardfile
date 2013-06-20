require 'guard/guard'

module ::Guard
  class Images < ::Guard::Guard
    def run_on_changes(paths)
      system 'rake'
    end
  end
end

module ::Guard
  class RakeDev < ::Guard::Guard
    def run_on_changes(paths)
      system 'rake create_pages'
    end
  end
end

guard 'images' do
  watch(%r{_photos/.*})
end

guard 'rake_dev' do
  watch('Rakefile')
  watch(%{_lib/.*})
  watch(%{_assets/.*})
  watch(%{_templates/.*})
end
