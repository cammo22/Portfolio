// Effetto Matrix unificato per tutte le pagine
document.addEventListener('DOMContentLoaded', function() {
    const matrixBg = document.getElementById('matrix-bg');
    if (!matrixBg) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    
    // Caratteri Matrix
    const matrixChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%<>[]{}|";
    
    // Array per tenere traccia della posizione Y di ogni colonna
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * height / fontSize;
    }
    
    // Funzione per creare l'effetto pioggia Matrix
    function drawMatrix() {
        const canvas = matrixBg.querySelector('canvas') || document.createElement('canvas');
        if (!matrixBg.querySelector('canvas')) {
            canvas.width = width;
            canvas.height = height;
            matrixBg.appendChild(canvas);
        }
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#0f0'; // Colore verde Matrix
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Esegui l'animazione Matrix
    setInterval(drawMatrix, 50);
    
    // Ridisegna su resize
    window.addEventListener('resize', () => {
        const canvas = matrixBg.querySelector('canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const columns = Math.floor(window.innerWidth / fontSize);
            drops.length = 0;
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * window.innerHeight / fontSize;
            }
        }
    });
});

// Gestione del menu mobile unificata
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            mobileMenu.classList.toggle('active');
        });
        
        // Chiudi il menu quando si clicca su un link
        const navLinks = document.querySelectorAll('#nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                mobileMenu.classList.remove('active');
            });
        });
    }
});