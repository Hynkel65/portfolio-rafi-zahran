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

        // Reset the bar to 0% width and clear the transition
        // This is a crucial step to ensure the animation starts fresh
        span.style.width = '0%';
        span.style.transition = 'none';

        // Animate the text
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

        // After a very short delay, set the final width to trigger the CSS transition
        // The setTimeout is necessary to allow the browser to render the initial 0% state first
        setTimeout(() => {
            span.style.transition = `width ${duration / 1000}s ease-in-out`;
            span.style.width = percentage + '%';
        }, 100); 
    });
}

    // Controls and event listeners
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");

            // Trigger counter animation if about section is activated
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
})();
