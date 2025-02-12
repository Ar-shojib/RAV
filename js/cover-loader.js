export class CoverLoader {
    constructor(options = {}) {
        this.options = {
            smallImageUrl: options.smallImageUrl || 'images/cover-tiny.jpg',
            largeImageUrls: options.largeImageUrls || [
                'images/cover-1920.webp',
                'images/cover-1280.webp',
                'images/cover-640.webp'
            ],
            container: options.container || '.cover-section',
            ...options
        };
        
        this.init();
    }

    init() {
        this.container = document.querySelector(this.options.container);
        if (!this.container) return;
        
        this.loadSmallImage()
            .then(() => this.loadLargeImage());
    }

    loadSmallImage() {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                this.container.querySelector('.cover-placeholder')
                    .style.backgroundImage = `url(${img.src})`;
                resolve();
            };
            img.src = this.options.smallImageUrl;
        });
    }

    loadLargeImage() {
        const img = new Image();
        img.onload = () => {
            const coverImg = this.container.querySelector('img');
            coverImg.src = img.src;
            coverImg.classList.add('loaded');
        };
        img.src = this.selectBestImageUrl();
    }

    selectBestImageUrl() {
        const width = window.innerWidth;
        const urls = this.options.largeImageUrls;
        
        if (width > 1280) return urls[0];
        if (width > 640) return urls[1];
        return urls[2];
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const coverLoader = new CoverLoader({
    smallImageUrl: 'images/cover-tiny.jpg',
    largeImageUrls: [
      'images/cover-1920.webp',
      'images/cover-1280.webp',
      'images/cover-640.webp'
    ],
    container: '.cover-section'
  });

  // Optimize for PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        // Pre-cache cover image
        registration.active.postMessage({
          type: 'CACHE_COVER',
          url: coverLoader.options.largeImageUrls[0]
        });
      });
  }
});
