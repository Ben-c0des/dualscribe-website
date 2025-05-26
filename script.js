// DualScribe Website JavaScript
// Simple, minimal JavaScript for enhanced user experience

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== DOWNLOAD BUTTON HANDLING =====
    const downloadButtons = document.querySelectorAll('#app-store-btn, #main-download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Replace this URL with your actual App Store URL when available
            const appStoreURL = '#'; // Will be: 'https://apps.apple.com/app/dualscribe/idXXXXXXXXX'
            
            // For now, show a message that the app is coming soon
            showComingSoonMessage();
            
            // When you have the App Store URL, replace the above line with:
            // window.open(appStoreURL, '_blank');
        });
    });
    
    // ===== COMING SOON MESSAGE =====
    function showComingSoonMessage() {
        // Create and show a simple modal/alert
        const message = 'DualScribe is currently under review by Apple. We\'ll update this page with the download link as soon as it\'s approved!';
        
        // Create modal elements
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 1rem;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 12px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        `;
        
        const modalText = document.createElement('p');
        modalText.textContent = message;
        modalText.style.cssText = `
            margin-bottom: 1.5rem;
            line-height: 1.6;
            color: #333;
        `;
        
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Got it!';
        closeButton.style.cssText = `
            background: #007AFF;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: background 0.3s ease;
        `;
        
        closeButton.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        closeButton.addEventListener('mouseover', function() {
            this.style.background = '#0056CC';
        });
        
        closeButton.addEventListener('mouseout', function() {
            this.style.background = '#007AFF';
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Assemble modal
        modalContent.appendChild(modalText);
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Focus the close button for accessibility
        closeButton.focus();
    }
    
    // ===== NAVBAR SCROLL EFFECT =====
    let lastScrollTop = 0;
    const navbar = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolling
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // ===== FEATURE CARD ANIMATIONS =====
    // Simple intersection observer for fade-in animations on scroll
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe feature cards and steps
        const animatedElements = document.querySelectorAll('.feature-card, .step');
        
        animatedElements.forEach(function(element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
    
    // ===== KEYBOARD NAVIGATION SUPPORT =====
    document.addEventListener('keydown', function(e) {
        // Close modal with Escape key
        if (e.key === 'Escape') {
            const modal = document.querySelector('[style*="z-index: 10000"]');
            if (modal) {
                document.body.removeChild(modal);
            }
        }
    });
    
    // ===== CONSOLE MESSAGE =====
    console.log('🎙️ DualScribe website loaded successfully!');
    console.log('Professional speech-to-text transcription coming soon to the App Store.');
});

// ===== UTILITY FUNCTIONS =====

// Function to update download links when App Store URL is available
function updateDownloadLinks(appStoreURL) {
    const downloadButtons = document.querySelectorAll('#app-store-btn, #main-download-btn');
    
    downloadButtons.forEach(button => {
        button.href = appStoreURL;
        button.onclick = null; // Remove the coming soon handler
    });
    
    // Update download notes
    const downloadNotes = document.querySelectorAll('.download-note');
    downloadNotes.forEach(note => {
        note.textContent = 'Available now on the App Store';
    });
    
    console.log('Download links updated with App Store URL:', appStoreURL);
}

// Function to add smooth reveal animations to elements
function addRevealAnimation(selector, delay = 0) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.8s ease ${delay + (index * 0.1)}s, transform 0.8s ease ${delay + (index * 0.1)}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Export functions for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateDownloadLinks,
        addRevealAnimation
    };
}