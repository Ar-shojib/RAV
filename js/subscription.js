document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscription-form');
  const messageEl = document.getElementById('form-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('subscriber_email').value;

    // Basic validation
    if (!isValidEmail(email)) {
      showMessage('Please enter a valid email address', 'error');
      return;
    }

    try {
      // Here you would normally send this to your backend
      // For demo, we'll simulate an API call
      await simulateSubscribe(email);
      showMessage('Thank you for subscribing!', 'success');
      form.reset();
    } catch (error) {
      showMessage('Something went wrong. Please try again.', 'error');
    }
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showMessage(message, type) {
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    setTimeout(() => {
      messageEl.textContent = '';
      messageEl.className = 'form-message';
    }, 5000);
  }

  async function simulateSubscribe(email) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // You would replace this with your actual API endpoint
        console.log('Subscribed:', email);
        resolve();
      }, 1000);
    });
  }
});
