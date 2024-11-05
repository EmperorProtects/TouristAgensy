
function setMode(mode) {
    document.body.className = mode;
    localStorage.setItem('mode', mode); 
}


function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username); // Save username to localStorage
        updateUI();
    }
}


function logout() {
    localStorage.removeItem('username'); // Remove username from localStorage
    updateUI();
}

function updateUI() {
    const username = localStorage.getItem('username');
    const loginForm = document.getElementById('userName');
    const logoutBtn = document.getElementById('surName');
    
    if (username) {
        loginForm.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        logoutBtn.style.display = 'none';
    }

    document.getElementById('username').value = username || '';
}


function applyPreferences() {
    const mode = localStorage.getItem('mode') || 'light';
    setMode(mode);
    
    const filter = localStorage.getItem('filter');
    document.getElementById('filter').value = filter || '';
}

function filterResults() {
    const filterText = document.getElementById('filter').value.toLowerCase();
    localStorage.setItem('filter', filterText); // Save current filter to localStorage
    const resultList = document.getElementById('result-list');
    
    const results = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
    resultList.innerHTML = results
        .filter(item => item.toLowerCase().includes(filterText))
        .map(item => `<li>${item}</li>`)
        .join('');
}

document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('logout-btn').addEventListener('click', logout);
document.getElementById('mode').addEventListener('change', (event) => setMode(event.target.value));
document.getElementById('filter').addEventListener('input', filterResults);

// Initialize app
applyPreferences();
updateUI();
filterResults();
