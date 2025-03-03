document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simuler un chargement
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            // Attendre que l'animation de la barre soit terminée
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Supprimer complètement après la transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 500);
        }
    }, 500);
});

// Ajouter un effet de glitch aléatoire sur les lettres
const letters = document.querySelectorAll('.letter');
letters.forEach(letter => {
    setInterval(() => {
        if (Math.random() > 0.9) {
            letter.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                letter.style.transform = 'translate(0, 0)';
            }, 100);
        }
    }, 100);
}); 