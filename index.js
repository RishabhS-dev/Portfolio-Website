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

const particles = [];

document.addEventListener('mousemove', (event) => {
    const particle = new MagicParticle(event.clientX, event.clientY);
    particles.push(particle);
});

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

// Name animation
document.addEventListener("DOMContentLoaded", function () {
    const heroTextTitle = document.querySelectorAll(".hero_text_title li span");
    gsap.from(heroTextTitle, {
        duration: 2,
        opacity: 0,
        y: 100,
        ease: "power4.out",
        stagger: 0.3
    });
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
