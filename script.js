document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Live Time (Saudi Arabia Time)
    ========================================= */
    function updateTime() {
        const now = new Date();
        // Saudi Arabia Time (UTC+3)
        const saudiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
        const hours = saudiTime.getHours().toString().padStart(2, '0');
        const minutes = saudiTime.getMinutes().toString().padStart(2, '0');
        const seconds = saudiTime.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        const timeElement = document.getElementById('current-time');
        if (timeElement) timeElement.textContent = timeString;
    }
    updateTime();
    setInterval(updateTime, 1000);

    /* =========================================
       2. Sticky Header on Scroll
    ========================================= */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       3. Mobile Menu Toggle
    ========================================= */
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navbar = document.getElementById('navbar');

    if (navToggle) navToggle.addEventListener('click', () => navbar.classList.add('active'));
    if (navClose) navClose.addEventListener('click', () => navbar.classList.remove('active'));

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navbar.classList.remove('active'));
    });

    document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Hero Video Fallback & Optimization
    ========================================= */
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Ensure video plays on mobile devices
        heroVideo.play().catch(error => {
            console.log("Video autoplay was prevented:", error);
            // Fallback: Add a static background image if video fails
            heroVideo.parentElement.style.backgroundImage = "url('image/hero.jpg')";
            heroVideo.parentElement.style.backgroundSize = "cover";
            heroVideo.parentElement.style.backgroundPosition = "center";
            heroVideo.style.display = "none";
        });
    }

    /* =========================================
       2. Scroll Reveal Animation for Hero Elements
    ========================================= */
    const revealElements = document.querySelectorAll('.hero .reveal');
    
    // Staggered reveal for a premium feel
    revealElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 200); // 200ms delay between each element
    });

    /* =========================================
       3. Quick Booking Widget Logic (WhatsApp Redirect)
    ========================================= */
    const quickBookingForm = document.getElementById('quick-booking-form');
    const hotelWhatsAppNumber = "9660551470063"; // ⚠️ Replace with actual WhatsApp number

    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;

            if (!checkin || !checkout) {
                alert('يرجى تحديد تاريخ الوصول والمغادرة.');
                return;
            }

            // Build a beautiful, professional WhatsApp message
            let message = `السلام عليكم ورحمة الله وبركاته،\n`;
            message += `أهلاً بكم في فندق أونارا ستاي (Onara Stay).\n\n`;
            message += `أرغب في التحقق من التوفر وحجز إقامة:\n`;
            message += `📅 تاريخ الوصول: ${checkin}\n`;
            message += `📅 تاريخ المغادرة: ${checkout}\n`;
            message += `👥 عدد الضيوف: ${guests}\n`;
            message += `\nيرجى تزويدي بالتفاصيل والأسعار المتاحة. شكراً لكم.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${hotelWhatsAppNumber}?text=${encodedMessage}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    /* =========================================
       4. Smooth Scrolling for Hero Buttons
    ========================================= */
    document.querySelectorAll('.hero a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Stats Section - Counter Animation
    ========================================= */
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats-section');

    // Function to animate a single counter
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 2200; // 2.2 seconds
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        const increment = target / totalFrames;
        
        let current = 0;
        let frame = 0;

        const updateCounter = () => {
            frame++;
            current += increment;
            
            if (frame >= totalFrames) {
                counter.innerText = target.toLocaleString('ar-EG');
            } else {
                // Use easing for a smoother animation
                const easeOutQuad = 1 - Math.pow(1 - (frame / totalFrames), 3);
                const displayValue = Math.ceil(target * easeOutQuad);
                counter.innerText = displayValue.toLocaleString('ar-EG');
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    };

    // Intersection Observer to trigger animation when section is in view
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate all counters with a small stagger
                counters.forEach((counter, index) => {
                    setTimeout(() => {
                        animateCounter(counter);
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* =========================================
       Stats Section - Reveal Animation
    ========================================= */
    const statsRevealElements = document.querySelectorAll('.stats-section .reveal');
    
    const statsRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    statsRevealElements.forEach(el => statsRevealObserver.observe(el));

});

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       About Section - Reveal Animation
    ========================================= */
    const aboutRevealElements = document.querySelectorAll('.about .reveal');
    
    const aboutRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    });

    aboutRevealElements.forEach(el => aboutRevealObserver.observe(el));

    /* =========================================
       About Section - Parallax Effect on Images
    ========================================= */
    const aboutImages = document.querySelector('.about-images');
    
    if (aboutImages && window.innerWidth > 992) {
        window.addEventListener('scroll', () => {
            const rect = aboutImages.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Only apply parallax when section is in view
            if (rect.top < windowHeight && rect.bottom > 0) {
                const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                const mainImg = aboutImages.querySelector('.about-img-main');
                const secondaryImg = aboutImages.querySelector('.about-img-secondary');
                const tertiaryImg = aboutImages.querySelector('.about-img-tertiary');
                
                if (mainImg) mainImg.style.transform = `translateY(${scrollProgress * -20}px)`;
                if (secondaryImg) secondaryImg.style.transform = `translateY(${scrollProgress * 15}px)`;
                if (tertiaryImg) tertiaryImg.style.transform = `translateY(${scrollProgress * -10}px)`;
            }
        });
    }

    /* =========================================
       About Section - Feature Cards Hover Ripple
    ========================================= */
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add a subtle bounce animation on hover
            this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

});


document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Rooms Section - Filter Tabs
    ========================================= */
    const filterBtns = document.querySelectorAll('.rooms-filter .filter-btn');
    const roomCards = document.querySelectorAll('.rooms-grid .room-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Animate cards filtering
            roomCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show the card
                    card.style.display = 'flex';
                    // Trigger a smooth animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s cubic-bezier(0.5, 0, 0, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    // Hide the card
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    /* =========================================
       Rooms Section - Reveal Animation
    ========================================= */
    const roomsRevealElements = document.querySelectorAll('.rooms .reveal');
    
    const roomsRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    });

    roomsRevealElements.forEach(el => roomsRevealObserver.observe(el));

    /* =========================================
       Rooms Section - Quick View Button (Placeholder)
    ========================================= */
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Get room name from parent card
            const card = btn.closest('.room-card');
            const roomName = card.querySelector('.room-title').textContent;
            
            // Show a nice notification (you can replace with a modal later)
            showNotification(`عرض تفاصيل: ${roomName}`, 'info');
        });
    });

    /* =========================================
       Rooms Section - Details Button (Placeholder)
    ========================================= */
    const detailsBtns = document.querySelectorAll('.btn-details');
    
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const card = btn.closest('.room-card');
            const roomName = card.querySelector('.room-title').textContent;
            
            showNotification(`تفاصيل كاملة عن: ${roomName}`, 'info');
        });
    });

    /* =========================================
       Helper: Notification System
    ========================================= */
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotif = document.querySelector('.toast-notification');
        if (existingNotif) existingNotif.remove();

        // Create notification
        const notif = document.createElement('div');
        notif.className = `toast-notification toast-${type}`;
        
        const icons = {
            info: '<i class="fas fa-info-circle"></i>',
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>'
        };
        
        notif.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
        `;

        // Add styles inline (or add to CSS)
        notif.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(50px);
            background: #2c2523;
            color: #ffffff;
            padding: 15px 25px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Tajawal', sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            z-index: 10000;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.5, 0, 0, 1);
            border-right: 4px solid #c5a059;
        `;

        document.body.appendChild(notif);

        // Animate in
        requestAnimationFrame(() => {
            notif.style.opacity = '1';
            notif.style.transform = 'translateX(-50%) translateY(0)';
        });

        // Remove after 3 seconds
        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(-50%) translateY(50px)';
            setTimeout(() => notif.remove(), 400);
        }, 3000);
    }

});






document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Services Section - Reveal Animation
    ========================================= */
    const servicesRevealElements = document.querySelectorAll('.services .reveal');
    
    const servicesRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    });

    servicesRevealElements.forEach(el => servicesRevealObserver.observe(el));

    /* =========================================
       Services Section - Service Card Click Handler
    ========================================= */
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const link = card.querySelector('.service-link');
        
        // Make the whole card clickable for the "Learn More" link
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the link itself (avoid double)
            if (e.target.closest('.service-link')) return;
            
            // Get service title
            const serviceTitle = card.querySelector('.service-title').textContent;
            
            // Show notification
            showNotification(`تفاصيل خدمة: ${serviceTitle}`, 'info');
        });
        
        // Also handle link click
        if (link) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const serviceTitle = card.querySelector('.service-title').textContent;
                showNotification(`سيتم عرض تفاصيل: ${serviceTitle}`, 'info');
            });
        }
    });

    /* =========================================
       Services Section - Stats Counter Animation
    ========================================= */
    const statValues = document.querySelectorAll('.services-stats .stat-value');
    
    const statsBarObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the numeric values
                statValues.forEach(stat => {
                    const text = stat.textContent.trim();
                    // Check if it's a numeric value (with possible + or % or /10)
                    const match = text.match(/^(\+?)(\d+)(\/?\d*)(%?)$/);
                    
                    if (match) {
                        const prefix = match[1]; // +
                        const targetNum = parseInt(match[2]);
                        const suffix = match[3]; // /10
                        const percent = match[4]; // %
                        
                        let current = 0;
                        const duration = 1800;
                        const step = targetNum / (duration / 16);
                        
                        const animate = () => {
                            current += step;
                            if (current < targetNum) {
                                stat.textContent = prefix + Math.floor(current) + suffix + percent;
                                requestAnimationFrame(animate);
                            } else {
                                stat.textContent = prefix + targetNum + suffix + percent;
                            }
                        };
                        animate();
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsBar = document.querySelector('.services-stats');
    if (statsBar) statsBarObserver.observe(statsBar);

    /* =========================================
       Helper: Notification System (Reusable)
    ========================================= */
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotif = document.querySelector('.toast-notification');
        if (existingNotif) existingNotif.remove();

        // Create notification
        const notif = document.createElement('div');
        notif.className = `toast-notification toast-${type}`;
        
        const icons = {
            info: '<i class="fas fa-info-circle"></i>',
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>'
        };
        
        notif.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
        `;

        notif.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(50px);
            background: #2c2523;
            color: #ffffff;
            padding: 15px 25px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Tajawal', sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            z-index: 10000;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.5, 0, 0, 1);
            border-right: 4px solid #c5a059;
        `;

        document.body.appendChild(notif);

        requestAnimationFrame(() => {
            notif.style.opacity = '1';
            notif.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(-50%) translateY(50px)';
            setTimeout(() => notif.remove(), 400);
        }, 3000);
    }

});

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Gallery Section - Reveal Animation
    ========================================= */
    const galleryRevealElements = document.querySelectorAll('.gallery .reveal');
    
    const galleryRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    galleryRevealElements.forEach(el => galleryRevealObserver.observe(el));

    /* =========================================
       Gallery Section - Filter Tabs
    ========================================= */
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    /* =========================================
       Gallery Section - Lightbox
    ========================================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

    // Build gallery data array from DOM
    const galleryData = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return {
            src: img.src,
            alt: img.alt,
            title: item.getAttribute('data-title') || img.alt,
            category: item.getAttribute('data-category')
        };
    });

    let currentIndex = 0;
    let visibleItems = [...galleryItems]; // Track visible items for lightbox navigation

    // Open lightbox
    function openLightbox(index) {
        // Filter to only visible items
        visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
        
        // Find the index of the clicked item in visible items
        const visibleIndex = visibleItems.indexOf(galleryItems[index]);
        
        if (visibleIndex === -1) return;
        
        currentIndex = visibleIndex;
        updateLightbox();
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update lightbox content
    function updateLightbox() {
        const item = visibleItems[currentIndex];
        if (!item) return;

        const img = item.querySelector('img');
        const title = item.getAttribute('data-title') || img.alt;

        // Animate image change
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxTitle.textContent = title;
            lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightbox();
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightbox();
    }

    // Add click events to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Lightbox controls
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') nextImage();
        if (e.key === 'ArrowRight') prevImage();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left → next
                nextImage();
            } else {
                // Swipe right → prev
                prevImage();
            }
        }
    }

});



document.addEventListener('DOMContentLoaded', function() {

    /* =========================================
       Testimonials NEW - Reveal Animation Only
    ========================================= */
    (function initTestimonialsNew() {
        
        const revealElements = document.querySelectorAll('.testimonials-new .reveal');
        
        if (revealElements.length === 0) {
            console.warn('⚠️ No testimonials-new reveal elements found');
            return;
        }
        
        console.log(`✅ Testimonials New initialized with ${revealElements.length} reveal elements`);
        
        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -60px 0px"
        });
        
        revealElements.forEach(function(el) {
            revealObserver.observe(el);
        });
        
        // Fallback: reveal everything after 1.5s if observer fails
        setTimeout(function() {
            revealElements.forEach(function(el) {
                if (!el.classList.contains('active')) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        el.classList.add('active');
                    }
                }
            });
        }, 1500);
        
    })();

    /* =========================================
       Score Circle Animation
    ========================================= */
    (function initScoreCircle() {
        const scoreCircle = document.querySelector('.tn-score-circle');
        
        if (!scoreCircle) return;
        
        const scoreObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Re-trigger the animation
                    const progress = scoreCircle.querySelector('.tn-score-progress');
                    if (progress) {
                        progress.style.animation = 'none';
                        void progress.offsetWidth; // Trigger reflow
                        progress.style.animation = 'tnScoreFill 2s cubic-bezier(0.5, 0, 0, 1) forwards';
                    }
                    scoreObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        scoreObserver.observe(scoreCircle);
    })();

    /* =========================================
       Counter Animation for Stats
    ========================================= */
    (function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.tn-stats-number');
        
        if (statNumbers.length === 0) return;
        
        const counterObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const text = element.textContent.trim();
                    
                    // Match patterns like "+1500", "97%", "10+"
                    const match = text.match(/^(\+?)(\d+)(%?)(\+?)$/);
                    
                    if (match) {
                        const prefix = match[1];
                        const targetNum = parseInt(match[2]);
                        const percent = match[3];
                        const suffix = match[4];
                        const duration = 1800;
                        
                        let current = 0;
                        const step = targetNum / (duration / 16);
                        
                        const animate = function() {
                            current += step;
                            if (current < targetNum) {
                                element.textContent = prefix + Math.floor(current) + percent + suffix;
                                requestAnimationFrame(animate);
                            } else {
                                element.textContent = prefix + targetNum + percent + suffix;
                            }
                        };
                        
                        animate();
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(function(stat) {
            counterObserver.observe(stat);
        });
    })();

});






document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       FAQ Section - Reveal Animation
    ========================================= */
    const faqRevealElements = document.querySelectorAll('.faq .reveal');
    
    const faqRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    });

    faqRevealElements.forEach(el => faqRevealObserver.observe(el));

    /* =========================================
       FAQ Section - Accordion
    ========================================= */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items (accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherBtn = otherItem.querySelector('.faq-question');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    /* =========================================
       FAQ Section - Category Filter
    ========================================= */
    const faqFilterBtns = document.querySelectorAll('.faq-filter .filter-btn');
    const faqEmpty = document.getElementById('faqEmpty');
    const faqContainer = document.querySelector('.faq-container');

    faqFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            faqFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            let visibleCount = 0;

            // Close all open items first
            faqItems.forEach(item => {
                item.classList.remove('active');
                const q = item.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });

            // Filter items
            faqItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    visibleCount++;
                    
                    // Animate in
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s cubic-bezier(0.5, 0, 0, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 30);
                } else {
                    // Animate out
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            // Show/hide empty state
            setTimeout(() => {
                if (visibleCount === 0) {
                    if (faqEmpty) faqEmpty.style.display = 'block';
                    if (faqContainer) faqContainer.style.display = 'none';
                } else {
                    if (faqEmpty) faqEmpty.style.display = 'none';
                    if (faqContainer) faqContainer.style.display = 'flex';
                }
            }, 350);
        });
    });

    /* =========================================
       FAQ Section - Search Support (Optional)
    ========================================= */
    // يمكنك إضافة مربع بحث لو حبيت - الكود ده جاهز للتوسع
    // const faqSearchInput = document.getElementById('faqSearch');
    // if (faqSearchInput) {
    //     faqSearchInput.addEventListener('input', (e) => {
    //         const query = e.target.value.toLowerCase().trim();
    //         // Filter logic...
    //     });
    // }

});

    /* =========================================
       4. Scroll Reveal Animation
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       5. Animated Counters (Stats)
    ========================================= */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current) + (target === 97 ? '%' : '+');
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target + (target === 97 ? '%' : '+');
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Madinah Section - Reveal Animation
    ========================================= */
    const madinahRevealElements = document.querySelectorAll('.madinah .reveal');
    
    const madinahRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    });

    madinahRevealElements.forEach(el => madinahRevealObserver.observe(el));

    /* =========================================
       Madinah Section - Filter Tabs
    ========================================= */
    const madinahFilterBtns = document.querySelectorAll('.madinah-filter .filter-btn');
    const landmarkCards = document.querySelectorAll('.madinah-grid .landmark-card');

    madinahFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            madinahFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            landmarkCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s cubic-bezier(0.5, 0, 0, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

});


document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Contact Section - Reveal Animation
    ========================================= */
    const contactRevealElements = document.querySelectorAll('.contact .reveal');
    
    const contactRevealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    });

    contactRevealElements.forEach(el => contactRevealObserver.observe(el));

    /* =========================================
       Contact Section - Live Time (Saudi Arabia)
    ========================================= */
    function updateContactTime() {
        const now = new Date();
        const saudiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
        const hours = saudiTime.getHours().toString().padStart(2, '0');
        const minutes = saudiTime.getMinutes().toString().padStart(2, '0');
        const seconds = saudiTime.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        const timeElement = document.getElementById('contact-live-time');
        if (timeElement) timeElement.textContent = timeString;
    }
    updateContactTime();
    setInterval(updateContactTime, 1000);

    /* =========================================
       Contact Section - Form Submit to WhatsApp
    ========================================= */
    const contactForm = document.getElementById('contactForm');
    const hotelWhatsAppNumber = "9660551470063"; // ⚠️ Replace with actual number

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name || !phone || !subject || !message) {
                showContactNotification('يرجى ملء جميع الحقول المطلوبة', 'warning');
                return;
            }

            // Phone validation (basic)
            const phoneRegex = /^[0-9+\s-]{8,}$/;
            if (!phoneRegex.test(phone)) {
                showContactNotification('يرجى إدخال رقم جوال صحيح', 'warning');
                return;
            }

            // Build WhatsApp message
            let waMessage = `السلام عليكم ورحمة الله وبركاته،\n`;
            waMessage += `أهلاً بكم في فندق أونارا ستاي (Ownara Stay).\n\n`;
            waMessage += `📩 *رسالة جديدة من نموذج التواصل*\n\n`;
            waMessage += `👤 *الاسم:* ${name}\n`;
            waMessage += `📱 *الجوال:* ${phone}\n`;
            if (email) waMessage += `📧 *البريد:* ${email}\n`;
            waMessage += `📌 *الموضوع:* ${subject}\n\n`;
            waMessage += `📝 *الرسالة:*\n${message}\n\n`;
            waMessage += `---\n`;
            waMessage += `شكراً لكم 🌟`;

            const encodedMessage = encodeURIComponent(waMessage);
            const whatsappUrl = `https://wa.me/${hotelWhatsAppNumber}?text=${encodedMessage}`;

            // Show success notification
            showContactNotification('جاري تحويلك إلى الواتساب...', 'success');

            // Open WhatsApp after short delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                contactForm.reset();
            }, 800);
        });
    }

    /* =========================================
       Contact Section - Notification System
    ========================================= */
    function showContactNotification(message, type = 'info') {
        const existingNotif = document.querySelector('.contact-toast');
        if (existingNotif) existingNotif.remove();

        const notif = document.createElement('div');
        notif.className = `contact-toast contact-toast-${type}`;

        const icons = {
            info: '<i class="fas fa-info-circle"></i>',
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>'
        };

        notif.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
        `;

        // Add toast styles dynamically if not already present
        if (!document.getElementById('contactToastStyles')) {
            const style = document.createElement('style');
            style.id = 'contactToastStyles';
            style.textContent = `
                .contact-toast {
                    position: fixed;
                    bottom: 100px;
                    left: 50%;
                    transform: translateX(-50%) translateY(50px);
                    background: #2c2523;
                    color: #ffffff;
                    padding: 15px 25px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Tajawal', sans-serif;
                    font-weight: 600;
                    font-size: 0.95rem;
                    z-index: 10000;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.5, 0, 0, 1);
                    border-right: 4px solid #c5a059;
                }
                .contact-toast-success { border-right-color: #25D366; }
                .contact-toast-warning { border-right-color: #e74c3c; }
                .contact-toast .toast-icon i { font-size: 1.2rem; color: #c5a059; }
                .contact-toast-success .toast-icon i { color: #25D366; }
                .contact-toast-warning .toast-icon i { color: #e74c3c; }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notif);

        requestAnimationFrame(() => {
            notif.style.opacity = '1';
            notif.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(-50%) translateY(50px)';
            setTimeout(() => notif.remove(), 400);
        }, 3000);
    }

    /* =========================================
       Contact Section - Input Focus Effects
    ========================================= */
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            const wrapper = input.closest('.input-wrapper');
            if (wrapper) wrapper.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            const wrapper = input.closest('.input-wrapper');
            if (wrapper) wrapper.classList.remove('focused');
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Footer - Current Year Auto Update
    ========================================= */
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    /* =========================================
       Footer - Live Time (Saudi Arabia)
    ========================================= */
    function updateFooterTime() {
        const now = new Date();
        const saudiTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
        const hours = saudiTime.getHours().toString().padStart(2, '0');
        const minutes = saudiTime.getMinutes().toString().padStart(2, '0');
        const seconds = saudiTime.getSeconds().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        const timeElement = document.getElementById('footer-live-time');
        if (timeElement) timeElement.textContent = timeString;
    }
    updateFooterTime();
    setInterval(updateFooterTime, 1000);

    /* =========================================
       Footer - Newsletter Form Submit to WhatsApp
    ========================================= */
    const newsletterForm = document.getElementById('newsletterForm');
    const hotelWhatsAppNumber = "9660551470063"; // ⚠️ Replace with actual number

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('newsletterName').value.trim();
            const phone = document.getElementById('newsletterPhone').value.trim();

            if (!name || !phone) {
                showFooterNotification('يرجى ملء جميع الحقول', 'warning');
                return;
            }

            // Phone validation
            const phoneRegex = /^[0-9+\s-]{8,}$/;
            if (!phoneRegex.test(phone)) {
                showFooterNotification('يرجى إدخال رقم جوال صحيح', 'warning');
                return;
            }

            let waMessage = `السلام عليكم ورحمة الله وبركاته،\n`;
            waMessage += `أهلاً بكم في فندق أونارا ستاي (Ownara Stay).\n\n`;
            waMessage += `🔔 *طلب اشتراك في النشرة البريدية*\n\n`;
            waMessage += `👤 *الاسم:* ${name}\n`;
            waMessage += `📱 *الجوال:* ${phone}\n\n`;
            waMessage += `أرغب في استقبال أحدث العروض والخصومات الحصرية.\n\n`;
            waMessage += `شكراً لكم 🌟`;

            const encodedMessage = encodeURIComponent(waMessage);
            const whatsappUrl = `https://wa.me/${hotelWhatsAppNumber}?text=${encodedMessage}`;

            showFooterNotification('جاري تحويلك إلى الواتساب...', 'success');

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                newsletterForm.reset();
            }, 800);
        });
    }

    /* =========================================
       Footer - Notification System
    ========================================= */
    function showFooterNotification(message, type = 'info') {
        const existingNotif = document.querySelector('.footer-toast');
        if (existingNotif) existingNotif.remove();

        const notif = document.createElement('div');
        notif.className = `footer-toast footer-toast-${type}`;

        const icons = {
            info: '<i class="fas fa-info-circle"></i>',
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>'
        };

        notif.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
        `;

        if (!document.getElementById('footerToastStyles')) {
            const style = document.createElement('style');
            style.id = 'footerToastStyles';
            style.textContent = `
                .footer-toast {
                    position: fixed;
                    bottom: 100px;
                    left: 50%;
                    transform: translateX(-50%) translateY(50px);
                    background: #2c2523;
                    color: #ffffff;
                    padding: 15px 25px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Tajawal', sans-serif;
                    font-weight: 600;
                    font-size: 0.95rem;
                    z-index: 10000;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.5, 0, 0, 1);
                    border-right: 4px solid #c5a059;
                }
                .footer-toast-success { border-right-color: #25D366; }
                .footer-toast-warning { border-right-color: #e74c3c; }
                .footer-toast .toast-icon i { font-size: 1.2rem; color: #c5a059; }
                .footer-toast-success .toast-icon i { color: #25D366; }
                .footer-toast-warning .toast-icon i { color: #e74c3c; }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notif);

        requestAnimationFrame(() => {
            notif.style.opacity = '1';
            notif.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(-50%) translateY(50px)';
            setTimeout(() => notif.remove(), 400);
        }, 3000);
    }

    /* =========================================
       Back to Top Button
    ========================================= */
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        // Show/hide based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* =========================================
       Footer - Smooth Scroll for Internal Links
    ========================================= */
    document.querySelectorAll('.footer-list a[href^="#"], .footer-contact a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});


document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Quick Booking Widget - Enhanced
    ========================================= */
    const quickBookingForm = document.getElementById('quick-booking-form');
    const hotelWhatsAppNumber = "9660551470063"; // ⚠️ Replace with actual number

    // Set minimum dates (today for checkin, tomorrow for checkout)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput) {
        checkinInput.min = formatDate(today);
        checkinInput.value = formatDate(tomorrow);
    }
    
    if (checkoutInput) {
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        checkoutInput.min = formatDate(tomorrow);
        checkoutInput.value = formatDate(dayAfterTomorrow);
    }

    // Update checkout min date when checkin changes
    if (checkinInput && checkoutInput) {
        checkinInput.addEventListener('change', () => {
            const checkinDate = new Date(checkinInput.value);
            const minCheckout = new Date(checkinDate);
            minCheckout.setDate(minCheckout.getDate() + 1);
            checkoutInput.min = formatDate(minCheckout);
            
            // Auto-adjust checkout if it's before new min
            if (new Date(checkoutInput.value) <= checkinDate) {
                const newCheckout = new Date(checkinDate);
                newCheckout.setDate(newCheckout.getDate() + 1);
                checkoutInput.value = formatDate(newCheckout);
            }
        });
    }

    // Form submit handler
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            const roomType = document.getElementById('roomType') 
                ? document.getElementById('roomType').value 
                : 'غير محدد';

            if (!checkin || !checkout) {
                showBookingNotification('يرجى تحديد تاريخ الوصول والمغادرة', 'warning');
                return;
            }

            // Calculate number of nights
            const checkinDate = new Date(checkin);
            const checkoutDate = new Date(checkout);
            const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

            if (nights <= 0) {
                showBookingNotification('تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول', 'warning');
                return;
            }

            // Format dates nicely in Arabic
            const formatArabicDate = (dateStr) => {
                const date = new Date(dateStr);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return date.toLocaleDateString('ar-SA', options);
            };

            // Build WhatsApp message
            let message = `السلام عليكم ورحمة الله وبركاته،\n`;
            message += `أهلاً بكم في فندق أونارا ستاي (Ownara Stay).\n\n`;
            message += `🏨 *طلب حجز جديد*\n\n`;
            message += `📅 *تاريخ الوصول:* ${formatArabicDate(checkin)}\n`;
            message += `📅 *تاريخ المغادرة:* ${formatArabicDate(checkout)}\n`;
            message += `🌙 *عدد الليالي:* ${nights} ${nights === 1 ? 'ليلة' : 'ليالٍ'}\n`;
            message += `👥 *عدد الضيوف:* ${guests}\n`;
            message += `🛏️ *نوع الغرفة:* ${roomType}\n\n`;
            message += `يرجى تزويدي بالتفاصيل والأسعار المتاحة. شكراً لكم.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${hotelWhatsAppNumber}?text=${encodedMessage}`;

            // Show success notification
            showBookingNotification(`جاري تحويلك للواتساب (${nights} ليالٍ)...`, 'success');

            // Open WhatsApp
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 800);
        });
    }

    /* =========================================
       Booking Notification System
    ========================================= */
    function showBookingNotification(message, type = 'info') {
        const existingNotif = document.querySelector('.booking-toast');
        if (existingNotif) existingNotif.remove();

        const notif = document.createElement('div');
        notif.className = `booking-toast booking-toast-${type}`;

        const icons = {
            info: '<i class="fas fa-info-circle"></i>',
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>'
        };

        notif.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
        `;

        if (!document.getElementById('bookingToastStyles')) {
            const style = document.createElement('style');
            style.id = 'bookingToastStyles';
            style.textContent = `
                .booking-toast {
                    position: fixed;
                    bottom: 100px;
                    left: 50%;
                    transform: translateX(-50%) translateY(50px);
                    background: #2c2523;
                    color: #ffffff;
                    padding: 15px 25px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: 'Tajawal', sans-serif;
                    font-weight: 600;
                    font-size: 0.95rem;
                    z-index: 10000;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.5, 0, 0, 1);
                    border-right: 4px solid #c5a059;
                }
                .booking-toast-success { border-right-color: #25D366; }
                .booking-toast-warning { border-right-color: #e74c3c; }
                .booking-toast .toast-icon i { font-size: 1.2rem; color: #c5a059; }
                .booking-toast-success .toast-icon i { color: #25D366; }
                .booking-toast-warning .toast-icon i { color: #e74c3c; }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notif);

        requestAnimationFrame(() => {
            notif.style.opacity = '1';
            notif.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(-50%) translateY(50px)';
            setTimeout(() => notif.remove(), 400);
        }, 3000);
    }

});

    /* =========================================
       7. Smart WhatsApp Booking System
    ========================================= */
    // ⚠️ تم تحديث الرقم بناءً على بيانات البحث
    const hotelWhatsAppNumber = "9660551470063"; // Replace with actual number

    // Handle all direct booking buttons
    const whatsappButtons = document.querySelectorAll('.whatsapp-book-btn');
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const roomType = btn.getAttribute('data-room') || 'غير محدد';
            
            let message = `السلام عليكم ورحمة الله وبركاته،\n`;
            message += `أهلاً بكم في فندق أونارا ستاي (Onara Stay).\n\n`;
            message += `أرغب في الاستفسار وحجز إقامة:\n`;
            
            if (roomType !== 'عام' && roomType !== 'استفسار عام') {
                message += `🛏️ نوع الغرفة: ${roomType}\n`;
            }
            
            message += `\nيرجى تزويدي بالتفاصيل والأسعار المتاحة. شكراً لكم.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${hotelWhatsAppNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    });

    // Handle Quick Booking Widget Form
    const quickBookingForm = document.getElementById('quick-booking-form');
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;

            if (!checkin || !checkout) {
                alert('يرجى تحديد تاريخ الوصول والمغادرة.');
                return;
            }

            let message = `السلام عليكم ورحمة الله وبركاته،\n`;
            message += `أهلاً بكم في فندق أونارا ستاي (Onara Stay).\n\n`;
            message += `أرغب في التحقق من التوفر وحجز إقامة:\n`;
            message += `📅 تاريخ الوصول: ${checkin}\n`;
            message += `📅 تاريخ المغادرة: ${checkout}\n`;
            message += `👥 عدد الضيوف: ${guests}\n`;
            message += `\nيرجى تزويدي بالتفاصيل والأسعار المتاحة. شكراً لكم.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${hotelWhatsAppNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    /* =========================================
       8. Smooth Scrolling for Anchor Links
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

});
