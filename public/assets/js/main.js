// Animation des événements de la timeline
document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.timeline-event');
    events.forEach((event, index) => {
        event.style.animationDelay = `${index * 0.2}s`;
    });

    // Gestion du menu burger
    const burgerMenu = document.querySelector('.burger-icon');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (burgerMenu) {
        // Toggle menu au clic sur le burger
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Créer le message de confirmation s'il n'existe pas déjà
            let confirmationMessage = document.querySelector('.confirmation-message');
            if (!confirmationMessage) {
                confirmationMessage = document.createElement('div');
                confirmationMessage.className = 'confirmation-message';
                document.body.appendChild(confirmationMessage);
            }

            // Récupérer les données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    // Message de succès
                    confirmationMessage.textContent = "Message envoyé avec succès ! 🚀";
                    confirmationMessage.className = 'confirmation-message success show';
                    contactForm.reset();
                } else {
                    // Message d'erreur avec détails
                    confirmationMessage.textContent = `Erreur: ${data.error || 'Une erreur est survenue'} 😕`;
                    confirmationMessage.className = 'confirmation-message error show';
                }
            } catch (error) {
                // Message d'erreur en cas de problème réseau
                confirmationMessage.textContent = "Erreur de connexion. Veuillez réessayer. 🔌";
                confirmationMessage.className = 'confirmation-message error show';
                console.error('Erreur:', error);
            }

            // Cacher le message après 3 secondes
            setTimeout(() => {
                confirmationMessage.classList.remove('show');
            }, 3000);
        });
    }

    // Animation des éléments au scroll
    animateOnScroll();
    animateTitles();
});

// Animation des éléments au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-card, .cert-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
}

// Animation des titres
function animateTitles() {
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        const letters = title.textContent.split('');
        title.textContent = '';
        
        letters.forEach((letter, i) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animationDelay = `${i * 0.1}s`;
            span.classList.add('animate-letter');
            title.appendChild(span);
        });
    });
} 