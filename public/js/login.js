const loginFormHandler = async (event) => {
event.preventDefault();

// if (checkFieldsLogin()) {
//     return 
// }

    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // console.log(email, password);

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
            alert(response.statusText);
        }
    }
};


const checkFieldsLogin= () => {
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (!email) {
        alert("Please enter email.");
        return false;
    }
    if (!password) {
        alert("Please enter password.");
        return false
    }
    return 
}


const signupFormHandler = async (event) => {
    event.preventDefault();
    // console.log("Form submitted");

    // if(checkFieldsSignup()) {
    //     return
    // }

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/users/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {

            const data = await response.json();
            console.log(data);
        }
    } else {
    }
}

const checkFieldsSignup = () => {
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (!name) {
        alert("Name field is empty!");
        return false;
    }
    if (!email) {
        alert("Email field is empty!");
        return false;
    }
    if (!password) {
        alert("Password field is empty!");
        return false
    }
    return true
}


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
