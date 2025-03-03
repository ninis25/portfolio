// Animation des événements de la timeline
document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.timeline-event');
    events.forEach((event, index) => {
        event.style.animationDelay = `${index * 0.2}s`;
    });
}); 