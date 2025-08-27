// ===== TIDE LANDING PAGE - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== INICIALIZAR SISTEMA DE TRADUCCIÓN =====
    initLanguage();
    
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // ===== SCROLL PROGRESS =====
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // ===== BACK TO TOP =====
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });



    // ===== INICIALIZACIÓN DE AOS =====
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // ===== BELIEF SLIDER =====
    const beliefSwiper = new Swiper('.belief-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 60000, // 1 minuto
            disableOnInteraction: false,
        },
        pagination: {
            el: '.belief-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.belief-swiper .swiper-button-next',
            prevEl: '.belief-swiper .swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        grabCursor: true,
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 0,
            }
        }
    });

    // ===== NAVEGACIÓN SCROLL =====
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== NAVEGACIÓN SUAVE =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== TYPEWRITER EFFECT =====
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const text = typewriterElement.textContent;
        typewriterElement.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typewriterElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }
        
        // Iniciar typewriter después de que el preloader termine
        setTimeout(typeWriter, 1500);
    }

    // ===== CONTADORES ANIMADOS =====
    const counters = document.querySelectorAll('[data-count]');
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Observer para contadores
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===== SWIPER TESTIMONIOS =====
    if (typeof Swiper !== 'undefined') {
        const testimoniosSwiper = new Swiper('.testimonios-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // ===== LAZY LOADING =====
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });



    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput) {
                console.error('No se encontró el campo de email del newsletter');
                return;
            }
            
            const email = emailInput.value;
            
            if (!email) {
                mostrarNotificacion('Por favor, ingresa tu email', 'error');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarNotificacion('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            mostrarNotificacion('¡Te has suscrito exitosamente!', 'success');
            this.reset();
        });
    }

    // ===== VALIDACIÓN DE EMAIL =====
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ===== SISTEMA DE NOTIFICACIONES =====
    function mostrarNotificacion(mensaje, tipo) {
        // Remover notificaciones existentes
        const notificacionesExistentes = document.querySelectorAll('.notificacion');
        notificacionesExistentes.forEach(notif => notif.remove());
        
        // Crear nueva notificación
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.innerHTML = `
            <div class="notificacion-contenido">
                <span class="notificacion-mensaje">${mensaje}</span>
                <button class="notificacion-cerrar">&times;</button>
            </div>
        `;
        
        // Agregar estilos CSS dinámicamente
        const estilos = `
            .notificacion {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                border-radius: 10px;
                padding: 1rem;
                color: #fff;
                font-weight: 500;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transform: translateX(100%);
                transition: all 0.3s ease;
            }
            .notificacion.show {
                transform: translateX(0);
            }
            .notificacion-success {
                background: rgba(40, 167, 69, 0.9);
                border-color: #28a745;
            }
            .notificacion-error {
                background: rgba(220, 53, 69, 0.9);
                border-color: #dc3545;
            }
            .notificacion-info {
                background: rgba(0, 123, 255, 0.9);
                border-color: #007bff;
            }
            .notificacion-contenido {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notificacion-cerrar {
                background: none;
                border: none;
                color: #fff;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        
        // Agregar estilos si no existen
        if (!document.querySelector('#notificacion-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notificacion-styles';
            styleSheet.textContent = estilos;
            document.head.appendChild(styleSheet);
        }
        
        // Agregar al DOM
        document.body.appendChild(notificacion);
        
        // Mostrar con animación
        setTimeout(() => {
            notificacion.classList.add('show');
        }, 100);
        
        // Cerrar notificación
        const cerrarBtn = notificacion.querySelector('.notificacion-cerrar');
        cerrarBtn.addEventListener('click', () => {
            notificacion.classList.remove('show');
            setTimeout(() => {
                notificacion.remove();
            }, 300);
        });
        
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.classList.remove('show');
                setTimeout(() => {
                    notificacion.remove();
                }, 300);
            }
        }, 5000);
    }



    // ===== PARALLAX EFFECT =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-bg-image, .video-bg, .full-width-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== SMOOTH SCROLL PARA ELEMENTOS INTERNOS =====
    const smoothScrollElements = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== MOBILE MENU =====
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Usar Bootstrap Collapse para el toggle
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        
        navbarToggler.addEventListener('click', function() {
            bsCollapse.toggle();
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                bsCollapse.hide();
            });
        });
        
        // Cerrar menú al hacer clic fuera del menú
        document.addEventListener('click', function(event) {
            const isClickInsideNavbar = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            
            if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    }

    // ===== HOVER EFFECTS =====
    const hoverElements = document.querySelectorAll('.servicio-card, .plan-card, .testimonio-card, .galeria-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ===== DEBOUNCE FUNCTION =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== THROTTLE FUNCTION =====
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    // Throttle scroll events
    const throttledScrollHandler = throttle(function() {
        // Scroll progress ya está manejado arriba
        // Navbar scroll ya está manejado arriba
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);

    // ===== ANALYTICS (ejemplo) =====
    function trackEvent(eventName, eventData = {}) {
        // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
        console.log('Event tracked:', eventName, eventData);
        
        // Ejemplo para Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }

    // Track clicks en botones importantes
    const importantButtons = document.querySelectorAll('.btn-primary');
    if (importantButtons.length > 0) {
        importantButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', function() {
                    trackEvent('button_click', {
                        button_text: this.textContent?.trim() || 'unknown',
                        button_location: this.closest('section')?.id || 'unknown'
                    });
                });
            }
        });
    }

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Aquí puedes enviar errores a un servicio de monitoreo
        });



    // ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const animateElements = document.querySelectorAll('.servicio-card, .plan-card, .testimonio-card, .galeria-item');
    animateElements.forEach(el => observer.observe(el));

    // ===== UTILITY FUNCTIONS =====
    
    // Función para formatear números
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Función para validar formularios
    function validateForm(formData) {
        const errors = [];
        
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const mensaje = formData.get('mensaje');
        
        if (!nombre || nombre.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }
        
        if (!email || !validarEmail(email)) {
            errors.push('Ingresa un email válido');
        }
        
        if (!mensaje || mensaje.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }
        
        return errors;
    }
    
    // Función para copiar al portapapeles
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            mostrarNotificacion('Copiado al portapapeles', 'success');
        }).catch(function() {
            mostrarNotificacion('Error al copiar', 'error');
        });
    }

    // ===== INITIALIZATION COMPLETE =====
    console.log('TIDE Landing Page initialized successfully!');
    
    // Track page view
    trackEvent('page_view', {
        page_title: document.title,
        page_url: window.location.href
    });

});

// ===== GLOBAL FUNCTIONS =====

// Función para abrir WhatsApp
function openWhatsApp(message = 'Hola! Quiero empezar mi transformación con TIDE') {
    const phone = '5491112345678';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Función para compartir en redes sociales
function shareOnSocial(platform, url = window.location.href, text = 'TIDE - Una forma de vivir') {
    let shareUrl;
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        default:
            return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Función para imprimir página
function printPage() {
    window.print();
}

// Función para cambiar tema (futuro)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// ===== MODAL FUNCTIONS =====

function openModal(type) {
    const modal = document.getElementById('beliefModal');
    const modalContent = document.getElementById('modalContent');
    
    let content = '';
    
    switch(type) {
        case 'lifestyle':
            content = `
                <h2 class="modal-title">Estilo de Vida</h2>
                <p class="modal-text">Esto no es solo una marca. Es una forma de vivir.</p>
                <p class="modal-text">En TIDE creemos que el verdadero cambio se construye desde los pequeños detalles. Lo que comés, cómo entrenás, cómo descansás, con quién te rodeás… todo importa. Todo suma.</p>
                <p class="modal-text">Nuestro estilo de vida no se basa en extremos, sino en decisiones diarias que te empujan hacia tu mejor versión.</p>
                <p class="modal-text">Porque el bienestar no pasa solo en el gimnasio. Pasa en cada elección que hacés.</p>
                <p class="modal-text">Las herramientas más poderosas para tu salud son simples —y muchas veces, gratis:</p>
                <ul class="modal-list">
                    <li>Moverte todos los días</li>
                    <li>Dormir bien</li>
                    <li>Tiempo al sol</li>
                    <li>Comer comida real (esto no es gratis, pero vale cada centavo)</li>
                    <li>Bajar un cambio y manejar el estrés</li>
                </ul>
            `;
            break;
            
        case 'training':
            content = `
                <h2 class="modal-title">Entrenamiento</h2>
                <p class="modal-text">Esto no se trata solo de entrenar. Se trata de hacerlo por vos. De elegir superarte. Es un mindset.</p>
                <p class="modal-text">El entrenamiento es la herramienta con la que construimos fuerza—no solo física, también mental. Es hacer lo que hay que hacer. Cada sesión es un paso hacia tu mejor versión.</p>
                <p class="modal-text">Trabajamos con objetivos claros, estructura sólida y disciplina diaria. Porque cuando se trata de mejorar, no hay atajos. Se trata de disfrutar el proceso y en quién te vas convirtiendo.</p>
                <p class="modal-text">No importa si estás empezando o si querés llevarlo al próximo nivel. El foco es el mismo: tener un plan consistente, entrenar con inteligencia e ir hacia los objetivos.</p>
            `;
            break;
            
        case 'nutrition':
            content = `
                <h2 class="modal-title">Nutrición</h2>
                <p class="modal-text">Me apasiona la nutrición, desde pequeño. Es claro: lo que comes impacta directamente en tus resultados, todo forma parte de un mismo camino.</p>
                <p class="modal-text">¿Querés rendir mejor en tus entrenamientos? ¿Mejorar tu descanso? ¿Sentirte con más energía durante el día? Entonces, lo que comés importa — y tiene un impacto directo en tu calidad de vida, todos los días.</p>
                <p class="modal-text">La idea no es volverse esclavo de la comida. Es aprender a usarla a tu favor. Entender qué necesita tu cuerpo y cuándo — para empujar más y vivir al máximo.</p>
                <p class="modal-text">No existe el bienestar real sin una base alimentaria sólida.</p>
                <p class="modal-text">Se trata de aprender a comer bien para poder vivir bien.</p>
            `;
            break;
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('beliefModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('beliefModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Cerrar modal con ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}); 

// ===== FORMULARIO CONTACTO =====
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contacto-form');
    if (!form) return;
  
    const submitBtn = form.querySelector('button[type="submit"]');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitBtn.disabled = true;
  
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),             // evita preflight
          headers: { 'Accept': 'application/json' }
        });
  
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`HTTP ${res.status} - ${txt.slice(0,200)}`);
        }
  
        form.reset();
        window.location.href = '/gracias.html'; // mejor absoluto
      } catch (err) {
        console.error('Error:', err);
        alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  });
  