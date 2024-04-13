const editPostFormHandler = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const id = form.querySelector('.post-id').value;
    const title = form.querySelector('.title').value;
    const content = form.querySelector('.content').value;

    if (title && content) {
        const response = await fetch(`/dashboard/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to edit post');
        }
    }
};

document.querySelectorAll('.edit-post-form').forEach(form => {
    form.addEventListener('click', editPostFormHandler);
});
