document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (!cursor || !cursorDot) return;

    let isMoving = false;
    let cursorTimeout;

    // Fonction pour mettre à jour la position du curseur
    const updateCursorPosition = (e) => {
        // Utiliser les coordonnées de la souris ou du touch
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;

        requestAnimationFrame(() => {
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;
        });

        // Réinitialiser le timeout
        clearTimeout(cursorTimeout);
        isMoving = true;
        cursor.style.opacity = 1;
        cursorDot.style.opacity = 1;

        // Masquer le curseur après 2 secondes d'inactivité
        cursorTimeout = setTimeout(() => {
            isMoving = false;
            cursor.style.opacity = 0;
            cursorDot.style.opacity = 0;
        }, 2000);
    };

    // Événements souris
    document.addEventListener('mousemove', updateCursorPosition);
    
    // Événements tactiles
    document.addEventListener('touchstart', updateCursorPosition);
    document.addEventListener('touchmove', updateCursorPosition);

    // Effet hover sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .burger-menu');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });

        // Support tactile
        el.addEventListener('touchstart', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });
        
        el.addEventListener('touchend', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });

    // Effet de clic
    const handleClick = () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 100);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
}); 