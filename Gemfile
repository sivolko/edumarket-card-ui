source "https://rubygems.org"

# Use the github-pages gem for full compatibility
gem "github-pages", "~> 231", group: :jekyll_plugins

# Additional GitHub Pages compatible gems
gem "webrick", "~> 1.8"

# Platform-specific gems for Windows compatibility
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for Windows
gem "wdm", "~> 0.1.1", platforms: [:mingw, :x64_mingw, :mswin]

# Development gems
group :development do
  gem "jekyll-livereload"
end
