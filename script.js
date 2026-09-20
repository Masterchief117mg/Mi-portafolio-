// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Movimiento del fondo tecnológico según el scroll
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

document.body.style.setProperty("--grid-move", (scrollY * 0.3) + "px");
});

// ==============================
// Animación del código según el scroll (Efecto Máquina de Escribir)
// ==============================
const codeLines = document.querySelectorAll(".code-line");
const allChars = []; // Guardará cada letra individualmente

// 1. Preparar el DOM: envolver cada letra en un <span>
codeLines.forEach(line => {
    // Reseteamos los estilos CSS iniciales que ocultaban la línea completa
    line.style.opacity = "1";
    line.style.transform = "none";
    line.style.transition = "none";

    function wrapTextNodes(node) {
        if (node.nodeType === 3) { // Si es un Nodo de texto
            const text = node.nodeValue;
            const fragment = document.createDocumentFragment();
            
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                span.style.opacity = '0'; // Inicialmente oculto
                span.style.transition = 'opacity 0.05s ease'; // Pequeña transición para suavidad
                allChars.push(span);
                fragment.appendChild(span);
            }
            node.parentNode.replaceChild(fragment, node);
            
        } else if (node.nodeType === 1) { // Si es un Nodo elemento (ej. <span> de color)
            Array.from(node.childNodes).forEach(wrapTextNodes);
        }
    }
    
    Array.from(line.childNodes).forEach(wrapTextNodes);
});

// 2. Animar en base al Scroll
function animateCode() {
    const scrollY = window.scrollY;
    
    // La animación ocupa los primeros 700px de desplazamiento
    const progress = Math.min(scrollY / 700, 1);
    
    // Número de caracteres que deben estar visibles
    const charsToShow = Math.floor(progress * allChars.length);

    allChars.forEach((charSpan, index) => {
        if (index < charsToShow) {
            charSpan.style.opacity = "1";
        } else {
            charSpan.style.opacity = "0";
        }
    });
}

window.addEventListener("scroll", animateCode);
animateCode();