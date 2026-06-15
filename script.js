// Roblox Bio Scraper - client side logic
// -------------------------------------------------
// This script handles form submission, communicates with Roblox's public APIs,
// and updates the UI with the retrieved biography.
// -------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bio-form');
    const usernameInput = document.getElementById('username');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const bioContainer = document.getElementById('bio-container');
    const displayUsername = document.getElementById('display-username');
    const displayBio = document.getElementById('display-bio');
    const copyBtn = document.getElementById('copy-btn');

    // Show loading spinner/message
    const showLoading = (show) => {
        loadingEl.className = show ? 'visible' : 'hidden';
    };

    // Show error message
    const showError = (msg) => {
        errorEl.textContent = msg;
        errorEl.className = 'error visible';
        bioContainer.className = 'hidden';
    };

    // Hide error message
    const hideError = () => {
        errorEl.className = 'hidden';
    };

    // Display fetched bio
    const showBio = (username, bio) => {
        displayUsername.textContent = username;
        displayBio.textContent = bio || '(No bio set)';
        bioContainer.className = 'bio visible';
    };

    // Reset UI before a new request
    const resetUI = () => {
        hideError();
        showLoading(false);
        bioContainer.className = 'hidden';
    };

    // Fetch userId from username
    const fetchUserId = async (username) => {
        const endpoint = `https://users.roblox.com/v1/users?username=${encodeURIComponent(username)}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch user information.');
        }
        const data = await response.json();
        if (!data || !data.data || data.data.length === 0) {
            throw new Error('User not found.');
        }
        return data.data[0].id;
    };

    // Fetch profile (including description) using userId
    const fetchUserProfile = async (userId) => {
        const endpoint = `https://users.roblox.com/v1/users/${userId}/profile`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Failed to fetch user profile.');
        }
        const data = await response.json();
        return data.description;
    };

    // Main handler for form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        if (!username) return;

        resetUI();
        showLoading(true);

        try {
            // Step 1: Get userId
            const userId = await fetchUserId(username);

            // Step 2: Get profile description
            const bio = await fetchUserProfile(userId);

            // Display result
            showBio(username, bio);
        } catch (err) {
            showError(err.message);
        } finally {
            showLoading(false);
        }
    });

    // Copy bio to clipboard
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(displayBio.textContent);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => (copyBtn.textContent = 'Copy Bio'), 1500);
        } catch (e) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = displayBio.textContent;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => (copyBtn.textContent = 'Copy Bio'), 1500);
        }
    });
});