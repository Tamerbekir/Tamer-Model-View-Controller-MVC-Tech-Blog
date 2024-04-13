const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if (title && content) {
        const response = await fetch(`/dashboard/post/create`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('There was an error registering you post. Please try again.');
        }
    }
};


document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);


const delBlogPostHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        
        const response = await fetch(`/dashboard/post/delete/${id}`, {
            method: 'DELETE',
        });

        // console.log(response);

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};


document.querySelector('.post-list').addEventListener('click', delBlogPostHandler);

