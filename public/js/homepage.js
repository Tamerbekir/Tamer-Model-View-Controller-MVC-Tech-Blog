const newCommentHandler = async (event) => {
    event.preventDefault();

    // Use the name attribute to select the input field
    const postId = event.target.querySelector('#postId').value;
    const content = event.target.querySelector('#userComment').value.trim();

    if (content) {
        const response = await fetch(`/homepage/create`, {
            method: 'POST',
            body: JSON.stringify({ postId, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create new comment');
        }
    }
};

document.querySelector('#userComment').addEventListener('submit', newCommentHandler);