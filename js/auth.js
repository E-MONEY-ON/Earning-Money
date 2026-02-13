// js/auth.js
// Authentication Functions

function updateAuthUI() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authElements = document.querySelectorAll('.auth-only');
    const guestElements = document.querySelectorAll('.guest-only');
    
    if (user) {
        authElements.forEach(el => el.classList.remove('hidden'));
        guestElements.forEach(el => el.classList.add('hidden'));
        
        // Update points display
        const pointsEl = document.getElementById('nav-points');
        if (pointsEl) {
            pointsEl.textContent = user.points;
        }
    } else {
        authElements.forEach(el => el.classList.add('hidden'));
        guestElements.forEach(el => el.classList.remove('hidden'));
    }
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    updateAuthUI();
    return true;
}

function checkAdmin() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || !user.isAdmin) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Check referral on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode && window.location.pathname.includes('register.html')) {
        // Store referral code for after registration
        sessionStorage.setItem('pendingReferral', refCode);
    }
});
// Register Function
function register(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === email)) {
        alert('User already exists!');
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        points: 0,
        isAdmin: false
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration Successful! Please Login.');
    window.location.href = 'login.html';
}

// Login Function
function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password!');
    }
}

