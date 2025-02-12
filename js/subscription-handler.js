class SubscriptionHandler {
    constructor() {
        this.form = document.getElementById('subscription-form');
        this.emailInput = document.getElementById('subscriber_email');
        this.submitButton = document.querySelector('.subscribe-btn');
        this.messageContainer = document.getElementById('form-message');
        this.setupListeners();
    }

    setupListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.validateEmail());
    }

    handleSubmit(e) {
        e.preventDefault();
        this.submitButton.disabled = true;
        this.showLoading();

        if (!this.validateEmail()) {
            this.showError('Please enter a valid email address');
            this.submitButton.disabled = false;
            this.hideLoading();
            return;
        }

        try {
            this.sendSubscriptionRequest()
                .then(response => {
                    if (response.success) {
                        this.showSuccess('Thank you for subscribing!');
                        this.form.reset();
                    }
                })
                .catch(error => {
                    this.showError(error.message || 'Subscription failed. Please try again.');
                })
                .finally(() => {
                    this.submitButton.disabled = false;
                    this.hideLoading();
                });
        } catch (error) {
            this.showError('An unexpected error occurred. Please try again.');
            this.submitButton.disabled = false;
            this.hideLoading();
        }
    }

    validateEmail() {
        const email = this.emailInput.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        
        if (!isValid) {
            this.showError('Please enter a valid email');
        } else {
            this.clearMessage();
        }
        
        return isValid;
    }

    async sendSubscriptionRequest() {
        const email = this.emailInput.value;
        
        try {
            // Send to local PHP handler
            const response = await fetch('php/subscribe.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `email=${encodeURIComponent(email)}`
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.message || 'Subscription failed');
            }

            return data;
        } catch (error) {
            console.error('Subscription error:', error);
            throw new Error('Unable to process subscription. Please try again later.');
        }
    }

    showLoading() {
        this.submitButton.innerHTML = '<span class="loading-spinner"></span> Subscribing...';
    }

    hideLoading() {
        this.submitButton.innerHTML = 'Subscribe';
    }

    showSuccess(message) {
        this.messageContainer.className = 'form-message success';
        this.messageContainer.textContent = message;
    }

    showError(message) {
        this.messageContainer.className = 'form-message error';
        this.messageContainer.textContent = message;
    }

    clearMessage() {
        this.messageContainer.className = 'form-message';
        this.messageContainer.textContent = '';
    }
}

// Initialize handler
document.addEventListener('DOMContentLoaded', () => {
    new SubscriptionHandler();
});
