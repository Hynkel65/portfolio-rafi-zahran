(function () {
    // Counter animation function
    function animateCounters() {
        const counters = document.querySelectorAll('.large-text');
        counters.forEach(counter => {
            // First, reset the counter to 0 before starting the animation
            const text = counter.textContent;
            const match = text.match(/(\d+)(\+?)/);
            if (match) {
                const suffix = match[2] || '';
                const target = parseInt(match[1]);
                counter.textContent = '0' + suffix; // Reset to 0 with the suffix

                // Now, begin the animation
                const duration = Math.random() * 2000 + 1000;
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

    // Controls and event listeners
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");

            // Trigger counter animation if about section is activated
            if (button.dataset.id === 'about') {
                animateCounters();
            }
        });
    });

    // Theme toggle button
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
})();