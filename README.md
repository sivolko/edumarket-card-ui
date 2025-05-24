# 🎓 EduMarket Card UI

> A modern, card-based teacher-student marketplace built with Jekyll and inspired by contemporary mobile app design.

[![Deploy Jekyll site to GitHub Pages](https://github.com/sivolko/edumarket-card-ui/actions/workflows/deploy.yml/badge.svg)](https://github.com/sivolko/edumarket-card-ui/actions/workflows/deploy.yml)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.3+-red?style=for-the-badge&logo=jekyll)](https://jekyllrb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

## 🚀 Live Demo

**[View Live Site →](https://sivolko.github.io/edumarket-card-ui/)**

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
- **Voice Search**: Speech-to-text search functionality

### 👨‍🏫 **Teacher Profiles**
- Modern profile cards with photos and ratings
- Detailed information about qualifications and experience
- Available teaching slots and scheduling
- Student reviews and testimonials
- Batch information and enrollment details

### 📱 **Progressive Web App (PWA)**
- Install on mobile devices
- Offline functionality
- Push notifications
- Touch gestures and haptic feedback

## 🛠️ Quick Start

### Prerequisites
- Ruby 2.7+
- Bundler gem
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sivolko/edumarket-card-ui.git
   cd edumarket-card-ui
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **View the site**
   Open http://localhost:4000 in your browser

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch using GitHub Actions.

### Manual Deployment

```bash
# Build for production
JEKYLL_ENV=production bundle exec jekyll build

# Deploy to GitHub Pages
npm run deploy:github
```

## 📁 Project Structure

```
edumarket-card-ui/
├── 📁 _data/              # YAML data files
│   ├── teachers.yml       # Teacher database
│   └── subjects.yml       # Subject information
├── 📁 _includes/          # Reusable components
│   ├── teacher-card.html  # Teacher card component
│   ├── subject-card.html  # Subject category card
│   └── search-filters.html # Search & filter component
├── 📁 _layouts/           # Page layouts
│   ├── default.html       # Base layout
│   ├── home.html          # Homepage layout
│   └── teacher.html       # Teacher profile layout
├── 📁 assets/             # Static assets
│   ├── css/main.css       # Main stylesheet
│   ├── js/main.js         # JavaScript functionality
│   └── images/            # Images and icons
├── 📁 .github/workflows/  # GitHub Actions
│   └── deploy.yml         # Auto-deployment workflow
├── index.html             # Homepage
├── teachers.html          # Teachers listing
├── subjects.html          # Subjects listing
├── manifest.json          # PWA manifest
└── sw.js                  # Service Worker
```

## 🎨 Customization

### Adding New Teachers

1. **Add to `_data/teachers.yml`**:
   ```yaml
   - id: 6
     name: "New Teacher Name"
     photo: "/assets/images/teachers/photo.jpg"
     subjects: ["Subject1", "Subject2"]
     experience: 5
     qualification: "Teacher Qualification"
     rating: 4.5
     # ... other fields
   ```

2. **Create profile page** in `_teachers/`:
   ```markdown
   ---
   layout: teacher
   title: "Teacher Name - Subject Expert"
   teacher_name: "New Teacher Name"
   ---
   ```

### Customizing Colors

Update CSS custom properties in `assets/css/main.css`:

```css
:root {
  --primary-600: #3b82f6;  /* Main brand color */
  --secondary-600: #8b5cf6; /* Secondary color */
  /* ... other variables */
}
```

## 🌟 Key Features

- **Modern UI**: Card-based design with gradients and animations
- **Mobile First**: Optimized for mobile devices with touch gestures
- **PWA Ready**: Installable app with offline functionality
- **Fast Loading**: Optimized images and lazy loading
- **SEO Friendly**: Proper meta tags and structured data
- **Accessible**: WCAG compliant with keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern mobile learning platforms
- Jekyll community for excellent documentation
- Font Awesome for icons
- Inter font family by Rasmus Andersson

---

**Built with ❤️ using Jekyll and modern web technologies**