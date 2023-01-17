const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();
  // Gather the data from the form elements on the page
  const username = document.querySelector('#username-input-signup').value.trim();
  const email = document.querySelector('#email-input-signup').value.trim();
  const password = document.querySelector('#password-input-signup').value.trim();
  const zipcode = document.querySelector('#zipcode-input-signup').value.trim();

  if (signup) {
      const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ username, email, password, zipcode  }),
          headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert('Failed to log in');
      }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
