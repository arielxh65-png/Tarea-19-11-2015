// Efectos y animaciones para la página principal
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Sistema de Formularios cargado correctamente");
    
    // Efecto hover mejorado para las cards
    const cards = document.querySelectorAll('.button-card');
    
    cards.forEach((card, index) => {
        // Animación de entrada escalonada
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Efecto de profundidad al hacer hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto para los botones de navegación
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform
