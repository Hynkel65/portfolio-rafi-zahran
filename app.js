(function () {
    // Counter animation function
    function animateCounters() {
        const counters = document.querySelectorAll('.large-text');
        counters.forEach(counter => {
            const text = counter.textContent;
            const match = text.match(/(\d+)(\+?)/);
            if (match) {
                const suffix = match[2] || '';
                const target = parseInt(match[1]);
                counter.textContent = '0' + suffix;
                const duration = Math.random() * 2000 + 3000;
                const steps = 50;
                const increment = target / (duration / steps);
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current) + suffix;
                }, steps);
            }
        });
    }

    // Function to animate progress bars
    function animateProgressBars() {
        const progressCons = document.querySelectorAll('.progress-con');
        progressCons.forEach(con => {
            const percentage = con.getAttribute('data-percentage');
            const span = con.querySelector('.progress span');
            const text = con.querySelector('.prog.text');
            span.style.width = '0%';
            span.style.transition = 'none';
            const target = parseInt(percentage);
            let current = 0;
            const duration = Math.random() * 2000 + 3000;
            const steps = 50;
            const increment = target / (duration / steps);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                text.textContent = Math.floor(current) + '%';
            }, steps);
            setTimeout(() => {
                span.style.transition = `width ${duration / 1000}s ease-in-out`;
                span.style.width = percentage + '%';
            }, 100);
        });
    }

    // ** Corrected Portfolio Click Functionality **
    function setupPortfolioClicks() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Ignore clicks on the GitHub link
                if (e.target.closest('.project-link a')) {
                    return;
                }
                
                // Remove 'busy' class from all other items
                portfolioItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.classList.remove('busy');
                    }
                });

                // Toggle 'busy' class on the clicked item
                this.classList.toggle('busy');
            });
        });
    }

    // Controls and event listeners for navigation buttons
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            // Remove active classes from navigation buttons and sections
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");

            // Trigger counter animation if 'about' section is activated
            if (button.dataset.id === 'about') {
                animateCounters();
                animateProgressBars();
            }
        });
    });

    // Theme toggle button
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Call the new portfolio function to set up the click listeners
    setupPortfolioClicks();
})();