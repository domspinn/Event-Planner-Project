document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    const signupForm = document.querySelector('#signup-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const email = document.querySelector('#login-email').value.trim();
        const password = document.querySelector('#login-password').value.trim();
  
        if (email && password) {
          const response = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to log in');
          }
        }
      });
    }
  
    if (signupForm) {
      signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const name = document.querySelector('#signup-name').value.trim();
        const email = document.querySelector('#signup-email').value.trim();
        const password = document.querySelector('#signup-password').value.trim();
  
        if (name && email && password) {
          const response = await fetch('/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to sign up');
          }
        }
      });
    }
  });
  