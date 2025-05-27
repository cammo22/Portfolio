document.addEventListener('DOMContentLoaded', function() {
    // --- Logica per il Menu Mobile ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            mobileMenu.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    mobileMenu.classList.remove('active');
                }
            });
        });
    }

    // --- Logica per la gestione del numero di telefono ---
    const phoneNumberEl = document.getElementById('phone-number');
    const revealButtonEl = document.getElementById('reveal-phone');
    const whatsappLinkEl = document.getElementById('whatsapp-link');
    const realPhoneNumberVal = "334-827-8543";

    if (revealButtonEl && phoneNumberEl && whatsappLinkEl) {
        revealButtonEl.addEventListener('click', function() {
            phoneNumberEl.textContent = realPhoneNumberVal;
            phoneNumberEl.style.color = '#0f0';
            revealButtonEl.style.display = 'none';
            whatsappLinkEl.style.display = 'inline-block';
            phoneNumberEl.style.cursor = 'pointer';
            phoneNumberEl.addEventListener('click', function() {
                window.open(`https://wa.me/39${realPhoneNumberVal.replace(/-/g, '')}`, '_blank');
            });
        });
    }

    // --- Logica per caricare i video da video.txt (specifico per musica.html) ---
    function extractVideoId(url) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    }

    function addYouTubeChannelLinkToPage(targetContainer) {
        if (!targetContainer || !targetContainer.parentNode) {
            console.warn('Contenitore non valido per il link al canale YouTube.');
            return;
        }

        const existingChannelLink = document.querySelector('.youtube-channel-link-container');
        if (existingChannelLink) {
            existingChannelLink.remove();
        }

        const channelLinkDiv = document.createElement('div');
        channelLinkDiv.className = 'youtube-channel-link-container text-center';
        channelLinkDiv.style.marginTop = '30px';
        channelLinkDiv.innerHTML = `
            <p>Scopri tutte le nostre produzioni musicali visitando il nostro canale YouTube:</p>
            <a href="https://www.youtube.com/@DaProdMusica/videos" target="_blank" class="btn btn-youtube">
                <i class="fab fa-youtube fa-lg"></i> Visita il Canale DaProdMusica
            </a>
            <p style="font-size: 0.9em; margin-top: 15px;">Tutti i video sono realizzati con software open source e generati offline.</p>
        `;
        targetContainer.parentNode.insertBefore(channelLinkDiv, targetContainer.nextSibling);
    }

    // Fallback con video hardcoded
    function loadVideosFromArray() {
        const videoIds = [
            'jexuwfBA0Fo',
            'mXyZzCB0ba8', 
            'XYIkNkon4gQ',
            'RhjZHy90jSk',
            'rtN5PTFfWzU',
            'b0xwUUtLY1A'
        ];
        
        const videoContainer = document.getElementById('playlist-container');
        if (!videoContainer) return;
        
        videoContainer.innerHTML = '';
        
        videoIds.forEach(videoId => {
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `
                <iframe
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    title="Video YouTube ${videoId}"></iframe>
            `;
            videoContainer.appendChild(videoElement);
        });

        addYouTubeChannelLinkToPage(videoContainer);
    }

    async function loadVideos() {
        const videoContainer = document.getElementById('playlist-container');
        if (!videoContainer) {
            return;
        }

        try {
            // Prova a caricare i video dal file video.txt
            const response = await fetch('video.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const videoText = await response.text();
            const videoUrls = videoText.split('\n').filter(url => url.trim() !== '');
            
            videoContainer.innerHTML = '';

            if (videoUrls.length === 0) {
                throw new Error('Nessun video trovato nel file');
            }

            let validVideos = 0;
            videoUrls.forEach(url => {
                const videoId = extractVideoId(url.trim());
                if (videoId) {
                    const videoElement = document.createElement('div');
                    videoElement.className = 'video-item';
                    videoElement.innerHTML = `
                        <iframe
                            src="https://www.youtube.com/embed/${videoId}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            title="Video YouTube ${videoId}"></iframe>
                    `;
                    videoContainer.appendChild(videoElement);
                    validVideos++;
                } else {
                    console.warn('URL video non valido:', url);
                }
            });

            if (validVideos === 0) {
                throw new Error('Nessun video valido trovato');
            }

            addYouTubeChannelLinkToPage(videoContainer);
            
        } catch (error) {
            console.error('Errore nel caricamento dei video dal file:', error);
            console.log('Caricamento video da array di fallback...');
            
            // Usa il fallback con video hardcoded
            loadVideosFromArray();
        }
    }

    // Call loadVideos only if the playlist container exists on the page
    if (document.getElementById('playlist-container')) {
        loadVideos();
    }

    // --- Smooth scrolling per i link interni ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip empty anchors
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
