document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const container = document.querySelector('.container');

    const handleLogin = (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('login-message');

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = 'portfolio.html';
        } else {
            message.textContent = 'Invalid Credentials. Please try again.';
            message.textContent = 'Passwords do not match.';
            message.style.color = 'rgb(255, 255, 255)';
            message.style.background = '#c85090';
            message.style.outline = 'none';
            message.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.6)';
        }
    };

    const handleRegister = (event) => {
        event.preventDefault();
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm').value;
        const name = document.getElementById('reg-name').value;
        const message = document.getElementById('register-message');

        if (password !== confirmPassword) {
            message.textContent = 'Passwords do not match.';
            message.style.color = 'rgb(255, 255, 255)';
            message.style.background = '#c85090';
            message.style.outline = 'none';
            message.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.6)';
            return;
        }

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('name', name);
        message.textContent = 'Registration successful! Redirecting to login page...';
        message.style.color = 'rgb(255, 255, 255)';
        message.style.background = '#50c8c4';
        message.style.outline = 'none';
        message.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.6)';

        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    };

    const loadContent = (url) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                container.innerHTML = data;
                const name = localStorage.getItem('name');
                if (name && url === 'home.html') {
                    document.getElementById('welcome-message').textContent = `Welcome ${name} to the`;
                }
            })
            .catch(error => console.error('Error loading content:', error));
    };

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const url = event.currentTarget.getAttribute('href');
            loadContent(`${url}`);
        });
    });

    const logoutButton = document.getElementById('logout-button');

    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        window.location.href = 'login.html';
    };

    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            handleLogout();
        });
    }

    // Load default content
    if (window.location.pathname.endsWith('home.html')) {
        loadContent('home.html');
    }
});
