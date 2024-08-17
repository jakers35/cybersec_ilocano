document.addEventListener('DOMContentLoaded', function() {
    const signinModal = document.getElementById('signin-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeButtons = document.querySelectorAll('.modal .close');
    const content = document.getElementById('content');
    const signupBtn = document.getElementById('signup-btn');

    // Check if the user is signed in
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        // Hide the content and show the sign-in modal if the user is not authenticated
        content.style.display = 'none';
        signinModal.style.display = 'flex';
    } else {
        content.style.display = 'block';
    }

    // Open Sign Up Modal
    signupBtn.addEventListener('click', function(event) {
        event.preventDefault();
        signupModal.style.display = 'flex';
    });

    // Close modals when 'x' is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            signinModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });

    // Close modals if the user clicks outside of them
    window.addEventListener('click', function(event) {
        if (event.target === signinModal) {
            signinModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });

    // Sign In Form Submission
    document.getElementById('signin-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // Example Authentication Logic
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        // Replace with actual authentication API call
        if (email === 'user@example.com' && password === 'password123') {
            localStorage.setItem('isAuthenticated', true);
            signinModal.style.display = 'none';
            content.style.display = 'block';
        } else {
            alert('Invalid credentials');
        }
    });

    // Sign Up Form Submission
    document.getElementById('signup-form').addEventListener('submit', function(e) {
        e.preventDefault();

        // Example Registration Logic
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Simulating a sign-up API call
        console.log('Sign up:', { name, email, password });
        alert('Registration successful!');
        signupModal.style.display = 'none';

        // Optionally, automatically sign in the user after signup
        localStorage.setItem('isAuthenticated', true);
        content.style.display = 'block';
    });

    // Responsive nav menu toggle
    document.querySelector('.burger-icon').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Fetch IP Location
    axios.get('https://ipapi.co/json/')
        .then(function(response) {
            const data = response.data;
            const location = `${data.city}, ${data.region}, ${data.country_name}`;
            document.getElementById('ip-info').textContent = `Your location is: ${location}`;
        })
        .catch(function(error) {
            console.log('Error fetching IP location:', error);
            document.getElementById('ip-info').textContent = 'Unable to fetch location.';
        });

    // Chatbot functionality (if applicable)
    document.getElementById('send-btn').addEventListener('click', function() {
        const userInput = document.getElementById('user-input').value;
        document.getElementById('messages').innerHTML += `<div class="user-message">${userInput}</div>`;
        
        // Call Dialogflow API here
        fetch('https://api.dialogflow.com/v1/query?v=20150910', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: userInput,
                lang: 'en',
                sessionId: '12345'
            })
        })
        .then(response => response.json())
        .then(data => {
            const botMessage = data.result.fulfillment.speech;
            document.getElementById('messages').innerHTML += `<div class="bot-message">${botMessage}</div>`;
        })
        .catch(error => console.error('Error:', error));
    });
});
