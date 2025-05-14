// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuHYRH4cRqITL6FMJ1GTQ99ihVxfnDEf8",
  authDomain: "loginsignup-63f01.firebaseapp.com",
  projectId: "loginsignup-63f01",
  storageBucket: "loginsignup-63f01.firebasestorage.app",
  messagingSenderId: "1095713402917",
  appId: "1:1095713402917:web:cdf4cc7438ed3d5ec30fcc",
  measurementId: "G-DQ77TT9X9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Get form elements
const form = document.getElementById('authForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const formTitle = document.getElementById('formTitle');
const toggleLink = document.getElementById('toggleLink');

let isLoginMode = false;

// Toggle between login and signup
function toggleMode() {
    isLoginMode = !isLoginMode;
    formTitle.textContent = isLoginMode ? 'Login' : 'Create Account';
    submitBtn.textContent = isLoginMode ? 'Login' : 'Create Account';
    toggleLink.textContent = isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Login';
    form.reset();
}

// Toggle link click handler
toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMode();
});

// Form submission handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    try {
        // Disable submit button while processing
        submitBtn.disabled = true;
        submitBtn.textContent = isLoginMode ? 'Logging in...' : 'Creating Account...';

        if (isLoginMode) {
            // Login
            await signInWithEmailAndPassword(auth, email, password);
            alert('Logged in successfully!');
        } else {
            // Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Account created successfully!');
        }
        
        // Clear form after successful action
        form.reset();
        
        // You can redirect to another page here if needed
        // window.location.href = 'dashboard.html';

    } catch (error) {
        let errorMessage = 'An error occurred.';
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
        }
        alert(errorMessage);
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = isLoginMode ? 'Login' : 'Create Account';
    }
});


