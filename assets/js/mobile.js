// Mobile App JavaScript for EduMarket
(function() {
    'use strict';

    // Mobile App Controller
    class MobileApp {
        constructor() {
            this.isMenuOpen = false;
            this.init();
        }

        init() {
            this.setupEventListeners();
            this.setupTouchInteractions();
            this.setupAnimations();
            this.setupCarousel();
            this.setupServiceWorker();
        }

        setupEventListeners() {
            // Hamburger menu functionality
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            if (hamburgerBtn) {
                hamburgerBtn.addEventListener('click', this.toggleMenu.bind(this));
            }

            // Search functionality
            const searchBtn = document.querySelector('.search-btn');
            if (searchBtn) {
                searchBtn.addEventListener('click', this.openSearch.bind(this));
            }

            // Popular items click functionality
            const popularItems = document.querySelectorAll('.popular-item');
            popularItems.forEach(item => {
                item.addEventListener('click', this.handlePopularItemClick.bind(this));
            });

            // Join button functionality
            const joinBtns = document.querySelectorAll('.join-btn, .join-now-btn');
            joinBtns.forEach(btn => {
                btn.addEventListener('click', this.handleJoinClick.bind(this));
            });

            // Add button functionality
            const addBtns = document.querySelectorAll('.add-btn');
            addBtns.forEach(btn => {
                btn.addEventListener('click', this.handleAddClick.bind(this));
            });

            // Bottom navigation
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.addEventListener('click', this.handleNavClick.bind(this));
            });

            // Profile avatar click
            const profileAvatar = document.querySelector('.profile-avatar');
            if (profileAvatar) {
                profileAvatar.addEventListener('click', this.openProfile.bind(this));
            }
        }

        setupTouchInteractions() {
            // Add touch feedback for all interactive elements
            const interactiveElements = document.querySelectorAll(
                '.popular-item, .trending-card, .join-btn, .add-btn, .nav-item, button'
            );

            interactiveElements.forEach(element => {
                element.addEventListener('touchstart', this.addTouchFeedback.bind(this));
                element.addEventListener('touchend', this.removeTouchFeedback.bind(this));
                element.addEventListener('touchcancel', this.removeTouchFeedback.bind(this));
            });

            // Swipe gestures for hero card
            this.setupSwipeGestures();
        }

        setupSwipeGestures() {
            const heroCard = document.querySelector('.hero-card');
            if (!heroCard) return;

            let startX = 0;
            let startY = 0;
            let currentDot = 3; // Active dot index (0-based)
            const dots = document.querySelectorAll('.dot');

            heroCard.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });

            heroCard.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                
                const deltaX = endX - startX;
                const deltaY = endY - startY;

                // Check if it's a horizontal swipe
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                    if (deltaX > 0) {
                        // Swipe right - previous
                        currentDot = Math.max(0, currentDot - 1);
                    } else {
                        // Swipe left - next
                        currentDot = Math.min(dots.length - 1, currentDot + 1);
                    }
                    
                    this.updateCarousel(currentDot);
                }
            });
        }

        setupAnimations() {
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);

            // Observe sections for animations
            const sections = document.querySelectorAll('.popular-section, .trending-section');
            sections.forEach(section => observer.observe(section));
        }

        setupCarousel() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.updateCarousel(index);
                });
            });
        }

        updateCarousel(activeIndex) {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });

            // Add haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }

        toggleMenu() {
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            this.isMenuOpen = !this.isMenuOpen;
            
            hamburgerBtn.classList.toggle('active', this.isMenuOpen);
            
            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(20);
            }

            // TODO: Show/hide mobile menu
            console.log('Menu toggled:', this.isMenuOpen);
        }

        openSearch() {
            // TODO: Implement search modal
            console.log('Search opened');
            
            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }

        openProfile() {
            // TODO: Navigate to profile page
            console.log('Profile opened');
        }

        handlePopularItemClick(e) {
            const item = e.currentTarget;
            const category = item.dataset.category;
            
            // Add visual feedback
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);

            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }

            // Navigate to category
            this.navigateToCategory(category);
        }

        handleJoinClick(e) {
            e.stopPropagation();
            const btn = e.currentTarget;
            
            // Prevent double clicks
            if (btn.classList.contains('joining') || btn.disabled) return;
            
            btn.classList.add('joining');
            btn.disabled = true;

            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([10, 100, 10]);
            }

            // Simulate join process
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Joined';
                btn.style.background = 'var(--success-green)';
                btn.style.color = 'var(--white)';
                
                // Show success toast
                this.showToast('Successfully joined!', 'success');
            }, 800);
        }

        handleAddClick(e) {
            e.stopPropagation();
            const btn = e.currentTarget;
            const icon = btn.querySelector('i');
            
            btn.classList.toggle('added');
            
            if (btn.classList.contains('added')) {
                icon.className = 'fas fa-check';
                this.showToast('Added to favorites', 'success');
            } else {
                icon.className = 'fas fa-plus';
                this.showToast('Removed from favorites', 'info');
            }

            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }

        handleNavClick(e) {
            e.preventDefault();
            const navItem = e.currentTarget;
            const href = navItem.getAttribute('href');
            
            // Update active state
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            navItem.classList.add('active');

            // Add haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }

            // Navigate
            if (href && href !== '#') {
                // For now, just log the navigation
                console.log('Navigate to:', href);
                // TODO: Implement actual navigation
            }
        }

        navigateToCategory(category) {
            // TODO: Implement category navigation
            console.log('Navigate to category:', category);
            
            // For demo purposes, show toast
            this.showToast(`Opening ${category}...`, 'info');
        }

        addTouchFeedback(e) {
            const element = e.currentTarget;
            element.style.transform = 'scale(0.98)';
            element.style.transition = 'transform 0.1s ease';
        }

        removeTouchFeedback(e) {
            const element = e.currentTarget;
            element.style.transform = '';
            setTimeout(() => {
                element.style.transition = '';
            }, 100);
        }

        showToast(message, type = 'info') {
            // Create toast element
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            toast.innerHTML = `
                <div class="toast-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;

            // Add toast styles if not already present
            this.addToastStyles();

            // Add to DOM
            document.body.appendChild(toast);

            // Animate in
            setTimeout(() => toast.classList.add('show'), 100);

            // Remove after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, 3000);
        }

        addToastStyles() {
            if (document.querySelector('#toast-styles')) return;

            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%) translateY(-100px);
                    background: var(--white);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-lg);
                    border: 1px solid var(--border-color);
                    z-index: 1000;
                    opacity: 0;
                    transition: all 0.3s ease;
                    max-width: 90%;
                }
                
                .toast.show {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                    padding: var(--spacing-3) var(--spacing-4);
                }
                
                .toast-success .toast-content i {
                    color: var(--success-green);
                }
                
                .toast-info .toast-content i {
                    color: var(--primary-purple);
                }
            `;
            document.head.appendChild(styles);
        }

        setupServiceWorker() {
            // Register service worker for PWA functionality
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered:', registration);
                    })
                    .catch(error => {
                        console.log('SW registration failed:', error);
                    });
            }
        }
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Initialize the mobile app when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        new MobileApp();
    });

    // Handle page visibility changes for PWA
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // App became visible - refresh data if needed
            console.log('App became visible');
        }
    });

    // Handle online/offline status
    window.addEventListener('online', () => {
        console.log('App is online');
        // Show online indicator
    });

    window.addEventListener('offline', () => {
        console.log('App is offline');
        // Show offline indicator
    });

})();
