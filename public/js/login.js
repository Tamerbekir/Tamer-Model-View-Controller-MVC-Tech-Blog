const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (!email || !password ) {
        alert('Please fill in all fields.')
        return;
    }

    if (email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },

        });

        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/dashboard');

        } else {
            alert('Incorrect user name or password. Please try again.');
        }
    }
};


const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log(signupFormHandler);

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const passwordVerify = document.querySelector('#password-signup-verify').value.trim()

    if (!name || !email || !password || !passwordVerify) {
        alert('Please fill in all fields.')
        return;
    }

    if (password !== passwordVerify) {
        alert('Passwords do not match.')
        return;
    }

    if (name && email && password) {
        const response = await fetch('/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const data = await response.json();
            // console.log(data);
            alert(data.message);
        }
    } else {
    }
};


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
