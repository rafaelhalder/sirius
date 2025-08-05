// BIT MAGES Technology - Main JavaScript File

/**
 * Adiciona partículas animadas ao container especificado
 * @param {string} containerId - ID do container onde as partículas serão adicionadas
 * @param {number} particleCount - Número de partículas a serem criadas
 */
function addParticles(containerId, particleCount = 50) {
    const particlesContainer = document.getElementById(containerId);
    if (!particlesContainer) return;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

/**
 * Configura o efeito de scroll no header
 */
function setupHeaderScrollEffect() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Configura o smooth scroll para links âncora
 */
function setupSmoothScroll() {
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
}

/**
 * Configura animações de entrada para elementos quando entram na viewport
 */
function setupScrollAnimations() {
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

    // Observa elementos com a classe 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Configurações específicas para a página inicial
 */
function initHomePage() {
    // Adiciona partículas ao hero
    addParticles('particles', 50);

    // Efeito de digitação no hero
    const codeLines = document.querySelectorAll('.code-line');
    if (codeLines.length > 0) {
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, (index + 1) * 200);
        });
    }

    // Configurar formulário de contato
    setupContactForm();
}

/**
 * Configurações específicas para a página sobre
 */
function initAboutPage() {
    // Adiciona menos partículas na página sobre
    addParticles('particles', 30);

    // Anima a timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

/**
 * Utilitário para detectar a página atual
 */
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('sobre.html')) return 'about';
    if (path.includes('index.html') || path === '/') return 'home';
    return 'unknown';
}

/**
 * Configura o formulário de contato
 */
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message')
        };

        // Simula envio do formulário
        const submitBtn = form.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Enviando...</span>';
        submitBtn.disabled = true;

        // Simula delay de envio
        setTimeout(() => {
            // Aqui você integraria com um serviço de email real
            console.log('Dados do formulário:', data);
            
            // Cria mensagem WhatsApp
            const whatsappMessage = `Olá! Meu nome é ${data.name}.%0A%0AServiço de interesse: ${data.service}%0A%0AMensagem: ${data.message}%0A%0AContato: ${data.email}${data.phone ? ' - ' + data.phone : ''}`;
            const whatsappUrl = `https://api.whatsapp.com/send?phone=554192872286&text=${whatsappMessage}`;
            
            // Abre WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset do formulário
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Feedback visual
            showNotification('Mensagem preparada! Você será redirecionado para o WhatsApp.', 'success');
        }, 1500);
    });
}

/**
 * Mostra notificação para o usuário
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Adiciona estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? 'var(--primary)' : 'var(--accent)'};
        color: var(--dark);
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Anima entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove após 5 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

/**
 * Inicialização principal
 */
function init() {
    // Configurações comuns para todas as páginas
    setupHeaderScrollEffect();
    setupSmoothScroll();
    setupScrollAnimations();

    // Configurações específicas por página
    const currentPage = getCurrentPage();
    
    switch (currentPage) {
        case 'home':
            initHomePage();
            break;
        case 'about':
            initAboutPage();
            break;
    }

    // Log de inicialização
    console.log('🚀 BIT MAGES Technology - Site inicializado com sucesso!');
    console.log(`📄 Página atual: ${currentPage}`);
}

// Executa a inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);

// Adiciona classe CSS para elementos animados
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .timeline-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease-out;
    }

    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
            background: none;
            border: none;
            color: var(--text);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .nav-links {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
    }
`;
document.head.appendChild(style);

// FAQ functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Initialize functions based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Setup FAQ if it exists
    setupFAQ();
});
