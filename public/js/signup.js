const signupFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    // event.preventDefault();
    // Gather the data from the form elements on the page
    const first_name = document.querySelector('#first-input-signup').value.trim();
    const last_name = document.querySelector('#last-input-signup').value.trim();
    const email = document.querySelector('#email-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();
    const bodyText = JSON.stringify({ first_name, last_name, email, password  })
    if (event) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: bodyText,
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
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
    