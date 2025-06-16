// about.js - Comprehensive JavaScript for Xilombe Electronics About Page

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Mobile Menu Functionality
    // =============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNav = document.getElementById('primaryNav');
    
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        primaryNav.classList.toggle('visible');
        
        // Toggle hamburger animation
        this.querySelector('.hamburger').classList.toggle('active');
    });

    // =============================================
    // Testimonial Slider Functionality
    // =============================================
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    
    // Create dots for each testimonial
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', `View testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateTestimonial() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToTestimonial(index) {
        currentIndex = index;
        updateTestimonial();
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial();
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    }
    
    prevButton.addEventListener('click', prevTestimonial);
    nextButton.addEventListener('click', nextTestimonial);
    
    // Auto-advance testimonials every 5 seconds
    let sliderInterval = setInterval(nextTestimonial, 5000);
    
    // Pause auto-advance when user interacts
    const sliderControls = document.querySelector('.testimonial-slider');
    sliderControls.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    sliderControls.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(nextTestimonial, 5000);
    });
    
    // Initialize
    updateTestimonial();

    // =============================================
    // Team Section Tabs Functionality
    // =============================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update button states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update content visibility
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // =============================================
    // Email Toggle Functionality for Team Members
    // =============================================
    const emailToggles = document.querySelectorAll('.email-toggle');
    
    emailToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const emailId = this.getAttribute('aria-controls');
            const emailElement = document.getElementById(emailId);
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.setAttribute('aria-expanded', !isExpanded);
            emailElement.hidden = !emailElement.hidden;
            
            // Update button text
            this.innerHTML = isExpanded 
                ? '<i class="fas fa-envelope"></i> Show Email' 
                : '<i class="fas fa-envelope"></i> Hide Email';
        });
    });

    // =============================================
    // Smooth Scrolling for Anchor Links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // Lazy Loading for Images
    // =============================================
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyLoad = function() {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top < window.innerHeight + 100) {
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                }
            });
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        lazyLoad(); // Initial check
    }

    // =============================================
    // Accessibility Improvements
    // =============================================
    // Add focus styles for keyboard navigation
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.documentElement.classList.remove('keyboard-nav');
    });

    // =============================================
    // Animation on Scroll
    // =============================================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.mission-card, .timeline-item, .team-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // =============================================
    // Form Validation (for forms on other pages)
    // This would be more extensive in contact.js or enquiry.js
    // =============================================
    if (document.querySelector('form')) {
        document.querySelector('form').addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Create error message if it doesn't exist
                    if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('span');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
                        field.nextElementSibling.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                this.querySelector('.error').focus();
            }
        });
    }
});

// =============================================
// Additional Utility Functions
// =============================================
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNav = document.querySelector('#primaryNav');
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        primaryNav.classList.toggle('visible');
        this.classList.toggle('open');
    });
});
// Testimonial slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');
    
    function updateTestimonial() {
        testimonials.forEach((testimonial, index) => {
            testimonial.classList.toggle('active', index === currentIndex);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToTestimonial(index) {
        currentIndex = index;
        updateTestimonial();
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial();
    }

    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    }

    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Auto-rotate testimonials every 5 seconds
    let sliderInterval = setInterval(nextTestimonial, 5000);

    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    slider.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    slider.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(nextTestimonial, 5000);
    });

    // Initialize
    updateTestimonial();
});
// Countdown timer for special offer
document.addEventListener('DOMContentLoaded', function() {
    function updateCountdown() {
        const offerEndDate = new Date('January 31, 2026 23:59:59').getTime();
        const now = new Date().getTime();
        const distance = offerEndDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
// Newsletter form validation
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('#email');
            const agreeCheckbox = this.querySelector('#agree');
            let isValid = true;
            
            // Clear previous errors
            this.querySelectorAll('.error-message').forEach(el => el.remove());
            this.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
            
            // Email validation
            if (!emailInput.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid email address';
                errorMsg.style.color = 'red';
                errorMsg.style.display = 'block';
                errorMsg.style.marginTop = '5px';
                emailInput.parentNode.insertBefore(errorMsg, emailInput.nextSibling);
            }
            
            // Checkbox validation
            if (!agreeCheckbox.checked) {
                isValid = false;
                agreeCheckbox.classList.add('error');
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'You must agree to receive communications';
                errorMsg.style.color = 'red';
                errorMsg.style.display = 'block';
                errorMsg.style.marginTop = '5px';
                agreeCheckbox.parentNode.insertBefore(errorMsg, agreeCheckbox.nextSibling);
            }
            
            if (isValid) {
                // Simulate form submission
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Thank you for subscribing!';
                successMsg.style.color = 'green';
                successMsg.style.marginTop = '10px';
                successMsg.style.fontWeight = 'bold';
                this.appendChild(successMsg);
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    successMsg.remove();
                }, 3000);
            }
        });
    }
});
// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartNotification = document.createElement('div');
    cartNotification.className = 'cart-notification';
    cartNotification.style.position = 'fixed';
    cartNotification.style.bottom = '20px';
    cartNotification.style.right = '20px';
    cartNotification.style.backgroundColor = '#4CAF50';
    cartNotification.style.color = 'white';
    cartNotification.style.padding = '15px';
    cartNotification.style.borderRadius = '5px';
    cartNotification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    cartNotification.style.zIndex = '1000';
    cartNotification.style.display = 'none';
    document.body.appendChild(cartNotification);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Show notification
            cartNotification.textContent = `${productName} added to cart!`;
            cartNotification.style.display = 'block';
            
            // Hide after 3 seconds
            setTimeout(() => {
                cartNotification.style.display = 'none';
            }, 3000);
            
            // Here you would normally add to cart storage
            // For now, we'll just log it
            console.log(`Added to cart: ${productName}`);
        });
    });
});
  // Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            // Store original src in data-src if not already
            if (!img.dataset.src) {
                img.dataset.src = img.src;
                img.src = '';
            }
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
});
// Skip link focus
document.addEventListener('DOMContentLoaded', function() {
    const skipLink = document.querySelector('.skip-link');
    
    skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus();
            
            // Remove tabindex after blur to prevent keyboard trap
            target.addEventListener('blur', function() {
                this.removeAttribute('tabindex');
            }, { once: true });
        }
    });
});
// Dynamic meta tags for SEO
document.addEventListener('DOMContentLoaded', function() {
    // Update page title with current page info
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '') || 'Home';
    const siteName = 'Xilombe Electronics';
    
    if (pageName.toLowerCase() !== 'index') {
        document.title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | ${siteName}`;
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = window.location.href.split('?')[0].split('#')[0];
});
// ========== CORE FUNCTIONALITY (ALL PAGES) ==========

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle (exists on all pages)
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    if (menuToggle) {
        const primaryNav = document.querySelector('#primaryNav');
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            primaryNav.classList.toggle('visible');
            this.classList.toggle('open');
        });
    }

    // Skip link focus (accessibility - all pages)
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                target.addEventListener('blur', function() {
                    this.removeAttribute('tabindex');
                }, { once: true });
            }
        });
    }

    // SEO enhancements (all pages)
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '') || 'Home';
    const siteName = 'Xilombe Electronics';
    
    if (pageName.toLowerCase() !== 'index') {
        document.title = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | ${siteName}`;
    }
});

// Lazy loading (for all pages with images)
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});