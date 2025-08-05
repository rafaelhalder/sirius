// Include Header and Footer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to load external HTML content
    function loadHTML(elementId, filePath) {
        const element = document.getElementById(elementId);
        if (!element) return;

        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                // Reinitialize any scripts that might depend on the loaded content
                initializeLoadedContent();
            })
            .catch(error => {
                console.warn('Could not load', filePath, ':', error);
                // Fallback: keep existing content if loading fails
            });
    }

    // Function to initialize content after loading
    function initializeLoadedContent() {
        // Reinitialize mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.querySelector('.nav-links');

        if (mobileMenuBtn && mobileMenu) {
            // Remove existing listeners to avoid duplicates
            mobileMenuBtn.replaceWith(mobileMenuBtn.cloneNode(true));
            const newMobileMenuBtn = document.getElementById('mobile-menu-btn');
            
            newMobileMenuBtn.addEventListener('click', function() {
                mobileMenu.classList.toggle('mobile-active');
                newMobileMenuBtn.classList.toggle('active');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('nav')) {
                    mobileMenu.classList.remove('mobile-active');
                    newMobileMenuBtn.classList.remove('active');
                }
            });

            // Auto-hide mobile menu when clicking on links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('mobile-active');
                    newMobileMenuBtn.classList.remove('active');
                });
            });
        }
    }

    // Load header and footer if placeholders exist
    loadHTML('header-placeholder', 'includes/header.html');
    loadHTML('footer-placeholder', 'includes/footer.html');
});
