const newCommentHandler = async (event) => {
    event.preventDefault();

    // Use the name attribute to select the input field
    const blogPostId = event.target.querySelector('#blogPost_id').value;
    const content = event.target.querySelector('#userComment').value.trim();



    if (content) {
        const response = await fetch(`/comments/create`, {
            method: 'POST',
            body: JSON.stringify({ blogPostId, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            //checking to make sure comments are created
            console.log(response)
            document.location.reload();
        } else {
            alert('There was an problem submitting your comment. Please try again.');
        }
    }
};

// document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);

// const delCommentHandler = async (event) => {
//     event.preventDefault();
//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');
        
//         const response = await fetch(`/comments/delete/${id}`, {
//             method: 'DELETE',
//         });

//         // console.log(response);

//         if (response.ok) {
//             document.location.replace('/');
//         } else {
//             alert('Failed to delete comment');
//         }
//     }
// };


// document.querySelector('.comment').addEventListener('click', delCommentHandler);

