// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Header background on scroll
    const header = document.querySelector('.header');
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            this.reset();
        });
    }
    
    // CTA button functionality
    const ctaButtons = document.querySelectorAll('.btn-primary, .nav-cta button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (
                this.textContent.includes('Orçamento') ||
                this.textContent.includes('Ajuda') ||
                this.textContent.includes('Aprovação') ||
                this.textContent.includes('aprovado')
            ) {
                e.preventDefault();
                // Scroll to contact form
                const contactSection = document.querySelector('#contato');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation (excluindo cards do carrossel)
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card');
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }
    
    // Intersection observer for counter animation
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-target'));
                animateCounter(target, value);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe counter elements
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Carrossel de soluções automático e infinito (versão robusta)
let originalCardsHTML = null;
function setupInfiniteCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    
    // Salva o HTML original apenas se ainda não foi salvo e se há conteúdo
    if (!originalCardsHTML && track.children.length > 0) {
        originalCardsHTML = track.innerHTML;
    }
    if (!originalCardsHTML) return; // Garante que só roda se houver conteúdo
    
    // Cria um elemento temporário para clonar os cards
    const temp = document.createElement('div');
    temp.innerHTML = originalCardsHTML;
    
    // Filtra apenas elementos .service-card
    const cards = Array.from(temp.children).filter(el => el.classList && el.classList.contains('service-card'));
    
    // Limpa o track
    track.innerHTML = '';
    
    // Adiciona os cards originais
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Adiciona uma cópia completa para garantir continuidade infinita
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Aplica dimensões baseadas no tamanho da tela
    const width = window.innerWidth;
    let cardHeight, cardWidth, cardMargin;
    
    if (width <= 425) {
        cardHeight = '380px';
        cardWidth = '260px';
        cardMargin = '0 3px';
    } else if (width <= 480) {
        cardHeight = '400px';
        cardWidth = '280px';
        cardMargin = '0 5px';
    } else if (width <= 768) {
        cardHeight = '450px';
        cardWidth = '280px';
        cardMargin = '0 8px';
    } else {
        cardHeight = '500px';
        cardWidth = '320px';
        cardMargin = '0 10px';
    }
    
    // Garante que todos os cards do carrossel estejam visíveis e com altura fixa
    track.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '1';
        card.style.height = cardHeight;
        card.style.width = cardWidth;
        card.style.flexShrink = '0';
        card.style.margin = cardMargin;
        card.style.transform = 'none';
        card.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
    });
}

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setupInfiniteCarousel();
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupInfiniteCarousel, 100); // Pequeno delay para garantir renderização
});

// Carrossel de depoimentos (prints WhatsApp) automático e infinito
let originalTestimonialsHTML = null;
function setupInfiniteTestimonialsCarousel() {
    const track = document.getElementById('carousel-testimonials');
    if (!track) return;
    
    if (!originalTestimonialsHTML && track.children.length > 0) {
        originalTestimonialsHTML = track.innerHTML;
    }
    if (!originalTestimonialsHTML) return;
    
    const temp = document.createElement('div');
    temp.innerHTML = originalTestimonialsHTML;
    
    // Filtra apenas elementos .testimonial-image
    const cards = Array.from(temp.children).filter(el => el.classList && el.classList.contains('testimonial-image'));
    
    // Limpa o track
    track.innerHTML = '';
    
    // Adiciona os cards originais
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Adiciona uma cópia completa para garantir continuidade infinita
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Aplica dimensões baseadas no tamanho da tela
    const width = window.innerWidth;
    let cardHeight, cardWidth, cardMargin;
    
    if (width <= 425) {
        cardHeight = '280px';
        cardWidth = '180px';
        cardMargin = '0 15px';
    } else if (width <= 480) {
        cardHeight = '300px';
        cardWidth = '200px';
        cardMargin = '0 15px';
    } else if (width <= 679) {
        cardHeight = '350px';
        cardWidth = '240px';
        cardMargin = '0 15px';
    } else if (width <= 768) {
        cardHeight = '350px';
        cardWidth = '240px';
        cardMargin = '0 15px';
    } else {
        cardHeight = '400px';
        cardWidth = '280px';
        cardMargin = '0 15px';
    }
    
    // Garante que todos os prints estejam visíveis e com dimensões fixas
    track.querySelectorAll('.testimonial-image').forEach(card => {
        card.style.opacity = '1';
        card.style.width = cardWidth;
        card.style.height = cardHeight;
        card.style.flexShrink = '0';
        card.style.margin = cardMargin;
    });
}

let resizeTestimonialsTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTestimonialsTimeout);
    resizeTestimonialsTimeout = setTimeout(() => {
        setupInfiniteTestimonialsCarousel();
    }, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupInfiniteTestimonialsCarousel, 200);
}); 