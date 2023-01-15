const newFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();

    // Gather the data from the form elements on the page
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="post-body"]').value.trim();
    const token = localStorage.getItem('token');


    if (content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({ title, description: content }),
            headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        });
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert('Failed to log in');
        }
    }
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);