const newCommentHandler = async (event) => {
    event.preventDefault();

    const blogPostId = event.target.querySelector('#blogPost_id').value;
    const content = event.target.querySelector('#userComment').value


    if (content) {
        const response = await fetch(`/comments/create`, {
            method: 'POST',
            body: JSON.stringify({ blogPostId, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {

            document.location.reload();
        } else {
            alert('There was an problem submitting your comment. Please try again.');
        }
    }
};


const delCommentHandler = async (event) => {
    if (event.target.matches('.delete-comment-button')) {
        const confirmed = confirm("Are you sure you want to delete this comment?")

        if (confirmed) {

            const id = event.target.getAttribute('data-id');

            const response = await fetch(`/comments/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete comment');
            }
        }
        // console.log(delCommentHandler)
    }
}

document.addEventListener('click', delCommentHandler);

