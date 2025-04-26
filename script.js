// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when button is clicked
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Only if the href is not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('show')) {
                        navMenu.classList.remove('show');
                        const icon = mobileMenuBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Scroll to the target element
                    const headerHeight = document.querySelector('.header-container').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateElements = function() {
        const elements = document.querySelectorAll('.feature-item, .card, .testimonial-card, .stat-item');
        
        elements.forEach(function(element) {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if (position.top < window.innerHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateElements);
    
    // Run once on page load
    animateElements();
    
    // Form submission with validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // Simulate submission - in a real application, you would send to a server
                emailInput.value = '';
                alert('Thank you for subscribing! You will receive our newsletter soon.');
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateStats() {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.stats');
        const position = statsSection.getBoundingClientRect();
        
        if (position.top < window.innerHeight - 100) {
            statNumbers.forEach(function(stat) {
                const value = stat.textContent;
                const numValue = parseFloat(value.replace(/,/g, ''));
                let currentCount = 0;
                const increment = numValue / 50; // Divide by the number of steps
                const duration = 1500; // Animation duration in milliseconds
                const stepTime = duration / 50; // Time for each step
                
                // Reset the display
                stat.textContent = '0';
                
                const counter = setInterval(function() {
                    currentCount += increment;
                    
                    if (currentCount >= numValue) {
                        stat.textContent = value; // Set to the original formatted value
                        clearInterval(counter);
                    } else {
                        // If original has M+ or K+, handle accordingly
                        if (value.includes('M+')) {
                            stat.textContent = Math.floor(currentCount).toLocaleString() + 'M+';
                        } else if (value.includes('K+')) {
                            stat.textContent = Math.floor(currentCount).toLocaleString() + 'K+';
                        } else if (value.includes(',')) {
                            stat.textContent = Math.floor(currentCount).toLocaleString();
                        } else {
                            stat.textContent = Math.floor(currentCount) + '+';
                        }
                    }
                }, stepTime);
            });
            
            hasAnimated = true;
        }
    }
    
    // Check for stats animation on scroll
    window.addEventListener('scroll', animateStats);
    
    // Check once on load
    animateStats();
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(function(section) {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('nav ul li a[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('nav ul li a[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initialize any other components or plugins here
});