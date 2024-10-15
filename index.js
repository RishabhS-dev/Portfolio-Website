document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    // Custom Cursor
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.style.opacity = 0; // Initially hide the cursor
    document.body.appendChild(cursor);

    // Particle array
    const particles = [];

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.opacity = 1; // Show cursor on mouse move

        // Create particles on mouse move
        const particle = new MagicParticle(e.clientX, e.clientY);
        particles.push(particle);
    });

    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = 0; // Hide cursor when mouse leaves
    });

    // Particle class
    class MagicParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * (15 - 5) + 5;
            this.baseColor = "#00ffa0";
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.opacity = 1;
            this.element = this.createParticle();
        }

        createParticle() {
            const particleElement = document.createElement('div');
            particleElement.classList.add('particle');
            particleElement.style.left = `${this.x}px`;
            particleElement.style.top = `${this.y}px`;
            particleElement.style.width = `${this.size}px`;
            particleElement.style.height = `${this.size}px`;
            particleElement.style.backgroundColor = this.baseColor;
            particleElement.style.position = 'fixed'; // Ensure particles are positioned relative to the viewport
            particleElement.style.zIndex = 9999; // Ensure particles are on top
            document.body.appendChild(particleElement);
            return particleElement;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.02;
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            this.element.style.opacity = this.opacity;

            if (this.opacity <= 0) {
                this.element.remove();
            }
        }
    }

    function animateParticles() {
        particles.forEach((particle, index) => {
            particle.update();
            if (particle.opacity <= 0) {
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Hero text animation
    gsap.from('.hero_text h1', {
        duration: 2,
        opacity: 0,
        y: -50,
        ease: "power4.out",
    });

    gsap.from('.hero_text p', {
        duration: 2,
        opacity: 0,
        y: 50,
        ease: "power4.out",
        delay: 0.5,
    });

    // Scroll-triggered animations for sections
    gsap.utils.toArray('section').forEach((section) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                markers: false
            }
        });
    });

    // Name animation
    const heroTextTitle = document.querySelectorAll(".hero_text_title li span");
    gsap.from(heroTextTitle, {
        duration: 2,
        opacity: 0,
        y: 100,
        ease: "power4.out",
        stagger: 0.3
    });

    // Date and time update
    function updateDateTime() {
        const now = new Date();
        const options = { month: 'short', day: 'numeric', weekday: 'short' };
        const dayDateString = now.toLocaleString('en-US', options);
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const timeString = now.toLocaleString('en-US', timeOptions);
        const dateTimeString = `${dayDateString} | ${timeString}`;
        document.getElementById('dateTime').innerText = dateTimeString;
    }

    setInterval(updateDateTime, 1000);
    updateDateTime();
});

window.addEventListener('load', function() {
    const profilePic = document.querySelector('.profilepic');
    profilePic.classList.add('profilepic-loaded'); // Add class to trigger transition
});
