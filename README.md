# 🎓 EduMarket Card UI

> A modern, card-based teacher-student marketplace built with Jekyll and inspired by contemporary mobile app design.

[![Jekyll](https://img.shields.io/badge/Jekyll-4.3+-red?style=for-the-badge&logo=jekyll)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Mobile First](https://img.shields.io/badge/Mobile-First-green?style=for-the-badge)]()
[![Card Design](https://img.shields.io/badge/Design-Card%20Based-purple?style=for-the-badge)]()

## ✨ Features

### 🎨 **Modern Card-Based Design**
- Clean, colorful card layouts inspired by modern mobile apps
- Gradient backgrounds and vibrant color schemes
- Smooth animations and micro-interactions
- Mobile-first responsive design

### 🔍 **Advanced Search & Filtering**
- **Subject Categories**: Organized into colorful card categories
- **Real-time Search**: Instant results as you type
- **Smart Filters**: Filter by experience, rating, price, and teaching mode
- **Sorting Options**: Sort by rating, experience, price, and popularity

### 👨‍🏫 **Teacher Profiles**
- Modern profile cards with photos and ratings
- Detailed information about qualifications and experience
- Available teaching slots and scheduling
- Student reviews and testimonials
- Batch information and enrollment details

### 📱 **Mobile Experience**
- Touch-friendly interface optimized for mobile
- Fast loading with optimized assets
- Progressive Web App (PWA) capabilities
- Offline functionality for cached content

### 🚀 **Performance**
- Static site generation for lightning-fast loading
- Optimized images and assets
- SEO-friendly with proper meta tags
- Analytics and tracking ready

## 🎯 Design Inspiration

This project is inspired by modern mobile learning platforms featuring:
- Card-based layouts with vibrant gradients
- Clean typography and iconography
- Intuitive navigation and user flows
- Engaging visual elements and illustrations

## 🏗️ Project Structure

```
edumarket-card-ui/
├── 📁 _data/              # YAML data files
│   ├── teachers.yml       # Teacher database
│   ├── subjects.yml       # Subject information
│   └── testimonials.yml   # Student reviews
├── 📁 _includes/          # Reusable components
│   ├── header.html        # Site header
│   ├── footer.html        # Site footer
│   ├── teacher-card.html  # Teacher card component
│   └── subject-card.html  # Subject category card
├── 📁 _layouts/           # Page layouts
│   ├── default.html       # Base layout
│   ├── home.html          # Homepage layout
│   ├── teacher.html       # Teacher profile layout
│   └── subject.html       # Subject page layout
├── 📁 _sass/              # Sass stylesheets
│   ├── _variables.scss    # CSS variables
│   ├── _components.scss   # Component styles
│   ├── _cards.scss        # Card-specific styles
│   └── _responsive.scss   # Responsive design
├── 📁 assets/             # Static assets
│   ├── 📁 css/
│   ├── 📁 js/
│   ├── 📁 images/
│   └── 📁 icons/
├── 📁 _teachers/          # Teacher profile pages
├── 📁 _subjects/          # Subject category pages
├── index.html             # Homepage
├── teachers.html          # Teachers listing
├── subjects.html          # Subjects listing
├── about.html             # About page
└── contact.html           # Contact page
```

## 🚀 Quick Start

### Prerequisites
- Ruby 2.7 or higher
- Bundler gem
- Node.js (for asset compilation)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sivolko/edumarket-card-ui.git
   cd edumarket-card-ui
   ```

2. **Install dependencies**
   ```bash
   bundle install
   npm install  # For additional tooling
   ```

3. **Start development server**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **Open in browser**
   Navigate to `http://localhost:4000`

### Development Commands

```bash
# Start development server with live reload
bundle exec jekyll serve --livereload

# Build for production
bundle exec jekyll build

# Run with drafts
bundle exec jekyll serve --drafts

# Clean build files
bundle exec jekyll clean
```

## 📊 Adding Content

### Adding a New Teacher

1. **Add to `_data/teachers.yml`**:
   ```yaml
   - id: 6
     name: "Alex Johnson"
     photo: "/assets/images/teachers/alex-johnson.jpg"
     subjects: ["Mathematics", "Physics"]
     experience: 8
     qualification: "PhD in Applied Mathematics"
     rating: 4.9
     students_taught: 200
     teaching_mode: ["Online", "Hybrid"]
     location: "San Francisco, CA"
     hourly_rate: 75
     bio: "Passionate educator specializing in advanced mathematics"
     # ... additional fields
   ```

2. **Create profile page** in `_teachers/alex-johnson.md`:
   ```markdown
   ---
   layout: teacher
   title: "Alex Johnson - Mathematics Expert"
   teacher_id: 6
   ---
   ```

3. **Add teacher photo** to `assets/images/teachers/`

### Adding a New Subject Category

1. **Update `_config.yml`**:
   ```yaml
   subject_categories:
     - name: "New Category"
       slug: "new-category"
       icon: "📚"
       color: "from-blue-400 to-green-500"
       subjects: ["Subject 1", "Subject 2"]
   ```

## 🎨 Customization

### Colors and Themes

Update `_sass/_variables.scss` to customize the color scheme:

```scss
// Primary colors
$primary-color: #6366f1;
$secondary-color: #8b5cf6;
$accent-color: #06b6d4;

// Gradient combinations
$gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Card Layouts

Modify `_sass/_cards.scss` to adjust card designs:

```scss
.teacher-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  }
}
```

## 🔧 Configuration

### Jekyll Configuration

Key settings in `_config.yml`:

```yaml
# Site settings
title: "Your Site Name"
description: "Your site description"
url: "https://yourdomain.com"

# Enable features
features:
  dark_mode: true
  animations: true
  search_enabled: true
  filters_enabled: true
```

### SEO Configuration

```yaml
# SEO settings
author: "Your Name"
twitter:
  username: "your_twitter"
facebook:
  app_id: "your_app_id"
logo: "/assets/images/logo.png"
```

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in Settings → Pages
3. Select source: Deploy from a branch → main

### Netlify

1. Connect GitHub repository
2. Build command: `bundle exec jekyll build`
3. Publish directory: `_site`

### Custom Server

```bash
# Build the site
bundle exec jekyll build

# Upload _site folder to your server
rsync -avz _site/ user@server:/path/to/website/
```

## 📱 Mobile Optimization

- **Responsive Grid**: Automatically adjusts card layouts
- **Touch Gestures**: Swipe navigation and touch-friendly buttons
- **Performance**: Optimized images and lazy loading
- **PWA Ready**: Add to home screen functionality

## 🔍 SEO Features

- **Meta Tags**: Automatic title and description generation
- **Open Graph**: Social media sharing optimization
- **Schema Markup**: Structured data for search engines
- **Sitemap**: Auto-generated XML sitemap
- **Fast Loading**: Optimized for Core Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow mobile-first design principles
- Maintain card-based layout consistency
- Write semantic HTML
- Use CSS custom properties for theming
- Test on multiple devices and browsers

## 📈 Roadmap

### Phase 1 (Current)
- [x] Card-based UI implementation
- [x] Teacher profile system
- [x] Search and filtering
- [x] Mobile-responsive design

### Phase 2 (Next)
- [ ] User authentication
- [ ] Booking system
- [ ] Payment integration
- [ ] Real-time chat
- [ ] Video calling

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Advanced analytics
- [ ] Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern mobile learning platforms
- Jekyll community for excellent documentation
- Contributors and maintainers

## 📞 Support

- 📧 Email: support@edumarket.com
- 💬 Discord: [Join our community](https://discord.gg/edumarket)
- 🐛 Issues: [GitHub Issues](https://github.com/sivolko/edumarket-card-ui/issues)
- 📖 Docs: [Full Documentation](https://sivolko.github.io/edumarket-card-ui/docs)

---

**Built with ❤️ using Jekyll, inspired by modern mobile design**