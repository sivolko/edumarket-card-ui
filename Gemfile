source "https://rubygems.org"

# Jekyll core
gem "jekyll", "~> 4.3.0"

# Theme (if using a theme, otherwise remove this line)
# gem "minima", "~> 2.5"

# Jekyll plugins for enhanced functionality
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-paginate"
  gem "jekyll-archives"
  gem "jekyll-compress-images"
end

# Platform-specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# HTTP parser for URLs with non-ASCII characters
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Additional gems for enhanced functionality
gem "rouge", "~> 4.0"              # Syntax highlighting
gem "kramdown-parser-gfm"           # GitHub Flavored Markdown
gem "webrick", "~> 1.7"             # Web server for local development
gem "sassc", "~> 2.4"               # Sass compiler
gem "jekyll-babel"                  # ES6+ support

# Development gems
group :development do
  gem "guard"
  gem "guard-jekyll-plus"
  gem "guard-livereload"
end