//Cursor Animation 
class MagicParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * (15 - 5) + 5; // Random size between 5 and 15
        this.baseColor = "#00ffa0"; // Base color for the particles
        this.speedX = Math.random() * 2 - 1; // Random speed for X
        this.speedY = Math.random() * 2 - 1; // Random speed for Y
        this.opacity = 1; // Initial opacity
        this.element = this.createParticle(); // Create particle element
    }

    createParticle() {
        const particleElement = document.createElement('div');
        particleElement.classList.add('particle');
        particleElement.style.left = `${this.x}px`;
        particleElement.style.top = `${this.y}px`;
        particleElement.style.width = `${this.size}px`;
        particleElement.style.height = `${this.size}px`;
        particleElement.style.backgroundColor = this.baseColor;
        document.body.appendChild(particleElement);
        return particleElement;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02; // Slowly fade out
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.opacity = this.opacity;

        // Remove the particle if opacity goes below 0
        if (this.opacity <= 0) {
            this.element.remove();
        }
    }
}

// Handle particles on mousemove
const particles = [];

document.addEventListener('mousemove', (event) => {
    const particle = new MagicParticle(event.clientX, event.clientY);
    particles.push(particle);
});

// Update particles (requestAnimationFrame for smooth updates)
function animateParticles() {
    particles.forEach((particle, index) => {
        particle.update();
        // Remove particle from array if it's no longer visible
        if (particle.opacity <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animateParticles);
}

animateParticles(); // Start the animation loop

//name animation  

// Ensure that the DOM is fully loaded before running the animation
document.addEventListener("DOMContentLoaded", function() {
    // Select all the list items inside hero_text_title
    const heroTextTitle = document.querySelectorAll(".hero_text_title li span");

    // Create a timeline and animate the name to pop out
    gsap.from(heroTextTitle, {
        duration: 2,      // Duration of animation
        opacity: 0,         // Start with opacity 0
        y: 100,             // Start off the screen with a Y translation
        ease: "power4.out", // Easing for smoothness
        stagger: 0.3        // Delay between the animations of each element
    });
});


// Function to update date and time
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dayDateString = now.toLocaleString('en-US', options);
    
    // Get the time in 12-hour format with AM/PM
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const timeString = now.toLocaleString('en-US', timeOptions);

    // Combine the day, date, and time
    const dateTimeString = `${dayDateString} | ${timeString}`;
    document.getElementById('dateTime').innerText = dateTimeString;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display immediately
updateDateTime();
