// Main JavaScript for EduMarket
// Enhanced mobile interactions and PWA functionality

(function() {
    'use strict';
    
    // Initialize app when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });
    
    function initializeApp() {
        initPWA();
        initMobileEnhancements();
        initSearchEnhancements();
        initBookmarkSystem();
        initNotificationSystem();
        initPerformanceOptimizations();
    }
    
    // PWA Installation and Service Worker
    function initPWA() {
        let deferredPrompt;
        const installButton = document.getElementById('installButton');
        
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button if available
            if (installButton) {
                installButton.style.display = 'block';
            } else {
                showInstallBanner();
            }
        });
        
        // Handle install button click
        if (installButton) {
            installButton.addEventListener('click', async () => {
                if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    
                    if (outcome === 'accepted') {
                        console.log('PWA installed');
                        hideInstallBanner();
                    }
                    
                    deferredPrompt = null;
                }
            });
        }
        
        // Check if already installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            hideInstallBanner();
        });
    }
    
    function showInstallBanner() {
        const banner = document.createElement('div');
        banner.id = 'installBanner';
        banner.className = 'install-banner';
        banner.innerHTML = `
            <div class="install-content">
                <div class="install-text">
                    <h4>Install EduMarket</h4>
                    <p>Get the full app experience</p>
                </div>
                <div class="install-actions">
                    <button id="installNow" class="btn btn-primary btn-sm">Install</button>
                    <button id="installLater" class="btn btn-secondary btn-sm">Later</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Add event listeners
        document.getElementById('installNow').addEventListener('click', () => {
            if (window.deferredPrompt) {
                window.deferredPrompt.prompt();
            }
        });
        
        document.getElementById('installLater').addEventListener('click', hideInstallBanner);
        
        // Auto-hide after 10 seconds
        setTimeout(hideInstallBanner, 10000);
    }
    
    function hideInstallBanner() {
        const banner = document.getElementById('installBanner');
        if (banner) {
            banner.remove();
        }
    }
    
    // Mobile-specific enhancements
    function initMobileEnhancements() {
        // Touch gestures for cards
        initTouchGestures();
        
        // Mobile navigation
        initMobileNavigation();
        
        // Viewport height fix for mobile
        fixMobileViewport();
        
        // Haptic feedback
        initHapticFeedback();
    }
    
    function initTouchGestures() {
        let isTouch = false;
        let startX, startY;
        
        document.addEventListener('touchstart', (e) => {
            isTouch = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            if (!isTouch) return;
            
            const deltaX = e.touches[0].clientX - startX;
            const deltaY = e.touches[0].clientY - startY;
            
            // Detect swipe gestures
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (Math.abs(deltaX) > 50) {
                    // Horizontal swipe
                    const direction = deltaX > 0 ? 'right' : 'left';
                    handleSwipe(e.target, direction);
                }
            }
        }, { passive: true });
        
        document.addEventListener('touchend', () => {
            isTouch = false;
        });
    }
    
    function handleSwipe(element, direction) {
        const card = element.closest('.teacher-card, .subject-card');
        if (!card) return;
        
        if (direction === 'right') {
            // Swipe right to bookmark
            const bookmarkBtn = card.querySelector('.bookmark-btn');
            if (bookmarkBtn) {
                bookmarkBtn.click();
                showSwipeIndicator(card, 'Bookmarked!', 'success');
            }
        } else if (direction === 'left') {
            // Swipe left to share
            const shareBtn = card.querySelector('.share-btn');
            if (shareBtn) {
                shareBtn.click();
                showSwipeIndicator(card, 'Sharing...', 'info');
            }
        }
    }
    
    function showSwipeIndicator(card, message, type) {
        const indicator = document.createElement('div');
        indicator.className = `swipe-indicator ${type}`;
        indicator.textContent = message;
        
        card.appendChild(indicator);
        
        setTimeout(() => {
            indicator.remove();
        }, 2000);
    }
    
    function initMobileNavigation() {
        // Enhanced mobile menu
        const mobileMenu = document.querySelector('.nav-menu');
        const body = document.body;
        
        if (mobileMenu) {
            mobileMenu.addEventListener('transitionend', () => {
                if (mobileMenu.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            });
        }
        
        // Bottom navigation for mobile
        if (window.innerWidth <= 768) {
            createBottomNavigation();
        }
    }
    
    function createBottomNavigation() {
        const bottomNav = document.createElement('div');
        bottomNav.className = 'bottom-navigation';
        bottomNav.innerHTML = `
            <a href="/" class="bottom-nav-item ${window.location.pathname === '/' ? 'active' : ''}">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="/teachers/" class="bottom-nav-item ${window.location.pathname.includes('/teachers') ? 'active' : ''}">
                <i class="fas fa-users"></i>
                <span>Teachers</span>
            </a>
            <a href="/subjects/" class="bottom-nav-item ${window.location.pathname.includes('/subjects') ? 'active' : ''}">
                <i class="fas fa-book-open"></i>
                <span>Subjects</span>
            </a>
            <a href="/bookmarks/" class="bottom-nav-item">
                <i class="fas fa-bookmark"></i>
                <span>Saved</span>
            </a>
            <a href="/profile/" class="bottom-nav-item">
                <i class="fas fa-user"></i>
                <span>Profile</span>
            </a>
        `;
        
        document.body.appendChild(bottomNav);
        
        // Add padding to body to account for bottom nav
        document.body.style.paddingBottom = '80px';
    }
    
    function fixMobileViewport() {
        // Fix for iOS viewport height issues
        function setVh() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVh();
        window.addEventListener('resize', setVh);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVh, 100);
        });
    }
    
    function initHapticFeedback() {
        if ('vibrate' in navigator) {
            // Add haptic feedback to button clicks
            document.addEventListener('click', (e) => {
                if (e.target.matches('button, .btn, .card')) {
                    navigator.vibrate(10); // Short vibration
                }
            });
        }
    }
    
    // Enhanced search functionality
    function initSearchEnhancements() {
        const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="search"], input[type="search"]');
        
        searchInputs.forEach(input => {
            enhanceSearchInput(input);
        });
    }
    
    function enhanceSearchInput(input) {
        let searchTimeout;
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        
        // Voice search if available
        if ('webkitSpeechRecognition' in window) {
            addVoiceSearch(input);
        }
        
        // Search suggestions
        input.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                showSearchSuggestions(this);
            }, 300);
        });
        
        // Save search history
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                addToSearchHistory(this.value.trim());
            }
        });
    }
    
    function addVoiceSearch(input) {
        const voiceBtn = document.createElement('button');
        voiceBtn.type = 'button';
        voiceBtn.className = 'voice-search-btn';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.title = 'Voice Search';
        
        input.parentNode.appendChild(voiceBtn);
        
        voiceBtn.addEventListener('click', () => {
            startVoiceSearch(input, voiceBtn);
        });
    }
    
    function startVoiceSearch(input, button) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        button.classList.add('listening');
        button.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            input.dispatchEvent(new Event('input'));
        };
        
        recognition.onerror = function() {
            showNotification('Voice search failed. Please try again.', 'error');
        };
        
        recognition.onend = function() {
            button.classList.remove('listening');
            button.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.start();
    }
    
    function showSearchSuggestions(input) {
        // Implementation for search suggestions
        // This would integrate with the search-filters component
    }
    
    function addToSearchHistory(query) {
        let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        history.unshift(query);
        history = [...new Set(history)].slice(0, 10); // Keep unique, max 10
        localStorage.setItem('searchHistory', JSON.stringify(history));
    }
    
    // Bookmark system
    function initBookmarkSystem() {
        // Sync bookmarks across devices if user is logged in
        syncBookmarks();
        
        // Export/import bookmarks
        createBookmarkManagement();
    }
    
    function syncBookmarks() {
        // This would integrate with a backend service
        console.log('Bookmark sync initialized');
    }
    
    function createBookmarkManagement() {
        // Add bookmark management to user menu
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            const bookmarkLink = document.createElement('a');
            bookmarkLink.href = '/bookmarks/';
            bookmarkLink.innerHTML = '<i class="fas fa-bookmark"></i> My Bookmarks';
            userMenu.appendChild(bookmarkLink);
        }
    }
    
    // Notification system
    function initNotificationSystem() {
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            requestNotificationPermission();
        }
        
        // In-app notifications
        window.showNotification = showNotification;
    }
    
    function requestNotificationPermission() {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                
                // Show welcome notification
                setTimeout(() => {
                    showNotification('Welcome to EduMarket! 🎓', 'success');
                }, 2000);
            }
        });
    }
    
    function showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `app-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-hide
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Performance optimizations
    function initPerformanceOptimizations() {
        // Lazy loading for images
        lazyLoadImages();
        
        // Preload critical resources
        preloadResources();
        
        // Intersection Observer for animations
        initScrollAnimations();
    }
    
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    function preloadResources() {
        // Preload important pages
        const importantLinks = ['/teachers/', '/subjects/'];
        
        importantLinks.forEach(link => {
            const linkElement = document.createElement('link');
            linkElement.rel = 'prefetch';
            linkElement.href = link;
            document.head.appendChild(linkElement);
        });
    }
    
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => animationObserver.observe(el));
    }
    
    // Utility functions
    window.EduMarket = {
        showNotification,
        addToSearchHistory,
        syncBookmarks
    };
    
})();