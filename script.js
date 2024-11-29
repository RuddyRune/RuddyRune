const users = [
    { username: 'Eli', password: '123' },
    // You can add more users here
];

// Login functionality
document.getElementById('login-form').addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('login-message');

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('loggedInUser ', username); // Store username in localStorage
        alert('Login successful! Redirecting to home...'); // Alert for testing
        // location.replace('home.html'); // Uncomment this line for actual redirection
    } else {
        loginMessage.innerText = 'Invalid username or password.'; // Show error message
    }
}