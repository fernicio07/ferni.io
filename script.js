// Particle Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.vx = (Math.random() - 0.5) * 0.5;
		this.vy = (Math.random() - 0.5) * 0.5;
		this.radius = Math.random() * 2 + 1;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
		if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(34, 211, 238, 0.6)';
		ctx.fill();
	}
}

for (let i = 0; i < particleCount; i++) {
	particles.push(new Particle());
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	particles.forEach(particle => {
		particle.update();
		particle.draw();
	});

	// Draw connections
	particles.forEach((p1, i) => {
		particles.slice(i + 1).forEach(p2 => {
			const dx = p1.x - p2.x;
			const dy = p1.y - p2.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 150) {
				ctx.beginPath();
				ctx.strokeStyle = `rgba(251, 146, 60, ${0.3 * (1 - distance / 150)})`;
				ctx.lineWidth = 0.5;
				ctx.moveTo(p1.x, p1.y);
				ctx.lineTo(p2.x, p2.y);
				ctx.stroke();
			}
		});
	});

	requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

// Scroll animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
	observer.observe(el);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Auto-update year in footer
document.addEventListener('DOMContentLoaded', () => {
	const yearElement = document.getElementById('current-year');
	if (yearElement) {
		yearElement.textContent = new Date().getFullYear();
	}
});

// Logo scroll to top
document.querySelector('.logo').addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});