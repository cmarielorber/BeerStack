const editFormHandler = async (event) => {
    // Stop the browser from submitting the form so we can do so with JavaScript
    event.preventDefault();
    // Gather the data from the form elements on the page
    const titlePost = document.getElementById('post-title').value.trim();
    const bodyPost = document.getElementById('post-body').value.trim();
    const postID = document.getElementById('post-id').value.trim();

    if (bodyPost) {
        const response = await fetch(`/api/post/${postID}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: titlePost.value,
                body: bodyPost.value,
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in');
        }
    }
};
// const handleSubmit = (btn, postId) => {
//     btn.addEventListener('click', () => {
//       const newTitle =
//         btn.parentNode.parentNode.childNodes[1].childNodes[1].value;
//       const newBody = btn.parentNode.parentNode.childNodes[3].value;
  
//       if (newTitle.length <= 4 || newBody.length <= 4) {
//         document.getElementById('edit-post-status').style.display = 'flex';
//         setTimeout(() => {
//           document.getElementById('edit-post-status').style.display = 'none';
//         }, 3000);
//       } else {
//         editPost(newTitle, newBody, postId);
//       }
//     });
//   };

document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editFormHandler);