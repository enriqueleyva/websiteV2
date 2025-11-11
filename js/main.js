tailwind.config = {
	theme: {
		extend: {
			fontFamily: {
				display: ["Playfair Display", "serif"],
				sans: [
					"Inter",
					"ui-sans-serif",
					"system-ui",
					"-apple-system",
					"Segoe UI",
					"Roboto",
					"Helvetica Neue",
					"Arial",
					"Noto Sans",
					"sans-serif",
				],
			},
			colors: {
				ink: "#0f172a", // slate-900
				soft: "#f8fafc", // slate-50
				accent: "#0ea5e9", // sky-500
				gold: "#b08d57", // elegant accent
			},
			boxShadow: {
				soft: "0 10px 30px rgba(2,6,23,.08)",
			},
		},
	},
};

// --- Mobile menu toggle ---
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn?.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));

// --- Countdown ---
// Ajusta la hora del evento aquí (hora local del navegador)
const targetDate = new Date("2026-12-05T17:00:00");

function updateCountdown() {
	const now = new Date();
	const diff = targetDate - now;

	if (diff <= 0) {
		document.getElementById("countdown").innerHTML =
			'<div class="col-span-4 text-center text-xl">¡Hoy es el gran día! 🎉</div>';
		clearInterval(timer);
		return;
	}

	const s = Math.floor(diff / 1000);
	const days = Math.floor(s / 86400);
	const hours = Math.floor((s % 86400) / 3600);
	const mins = Math.floor((s % 3600) / 60);
	const secs = s % 60;

	document.getElementById("cd-days").textContent = days;
	document.getElementById("cd-hours").textContent = String(hours).padStart(
		2,
		"0"
	);
	document.getElementById("cd-mins").textContent = String(mins).padStart(
		2,
		"0"
	);
	document.getElementById("cd-secs").textContent = String(secs).padStart(
		2,
		"0"
	);
}
const timer = setInterval(updateCountdown, 1000);
updateCountdown();

// --- GSAP animations ---
gsap.registerPlugin(ScrollTrigger);

// Hero intro
gsap.from("#inicio h1", {
	y: 30,
	opacity: 0,
	duration: 1,
	ease: "power2.out",
});
gsap.from("#inicio p", {
	y: 20,
	opacity: 0,
	duration: 1,
	delay: 0.2,
	ease: "power2.out",
});
gsap.from("#countdown > div", {
	scale: 0.9,
	opacity: 0,
	duration: 0.6,
	delay: 0.4,
	ease: "back.out(1.7)",
	stagger: 0.06,
});

// Reveal on scroll utility
const reveal = (selector) => {
	gsap.utils.toArray(selector).forEach((el) => {
		gsap.from(el, {
			scrollTrigger: { trigger: el, start: "top 85%" },
			y: 24,
			opacity: 0,
			duration: 0.8,
			ease: "power2.out",
		});
	});
};
reveal("#cuando-donde .rounded-3xl");
reveal("#galeria img");
reveal("#confirmacion form");
reveal("#mesa-regalos .rounded-3xl");

// --- Lightbox ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImg) {
	document.querySelectorAll(".gallery-item").forEach((img) => {
		img.addEventListener("click", () => {
			document.documentElement.classList.add("overflow-hidden");
			document.body.classList.add("overflow-hidden");
			lightboxImg.src = img.src.replace("w=800", "w=1600");
			lightbox.classList.remove("hidden");
			gsap.fromTo(
				"#lightboxImg",
				{ scale: 0.95, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
			);
		});
	});
}

const closeLb = () => {
	lightbox.classList.add("hidden");
	document.documentElement.classList.remove("overflow-hidden");
	document.body.classList.remove("overflow-hidden");
};

lightboxClose?.addEventListener("click", (event) => {
	event.stopPropagation();
	closeLb();
});

lightbox.addEventListener("click", (event) => {
	if (event.target === lightbox) closeLb();
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
		closeLb();
	}
});

// --- RSVP fake handler (muestra mensaje sin backend) ---
document.getElementById("rsvpForm").addEventListener("submit", function (e) {
	e.preventDefault();
	const formMsg = document.getElementById("formMsg");
	formMsg.textContent = "¡Gracias! Hemos recibido tu confirmación.";
	this.reset();
});
