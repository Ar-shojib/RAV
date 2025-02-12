import { CoverLoader } from './cover-loader.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cover loader
    new CoverLoader({
        container: '.cover-section',
        smallImageUrl: 'images/cover-tiny.jpg',
        largeImageUrls: [
            'images/cover-1920.webp',
            'images/cover-1280.webp', 
            'images/cover-640.webp'
        ]
    });

    // Preload next section images
    window.addEventListener('load', () => {
        requestIdleCallback(() => {
            const images = document.querySelectorAll('[data-preload]');
            images.forEach(img => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.dataset.src;
                document.head.appendChild(link);
            });
        });
    });
});
