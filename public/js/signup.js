const signupFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
    // Gather the data from the form elements on the page
    const username = document.querySelector('#username-input-signup').value.trim();
    const email = document.querySelector('#email-input-signup').value.trim();
    const password = document.querySelector('#password-input-signup').value.trim();

    if (signup) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, email, password,  }),
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
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);