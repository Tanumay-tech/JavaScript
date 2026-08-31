function setTheme(theme) {
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('userTheme', theme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) {
        setTheme(savedTheme);
    }
}

const draftInput = document.getElementById('draftInput');

draftInput.addEventListener('input', function() {
    sessionStorage.setItem('tempDraft', draftInput.value);
});

function loadDraft() {
    const savedDraft = sessionStorage.getItem('tempDraft');
    if (savedDraft) {
        draftInput.value = savedDraft;
    }
}

window.onload = function() {
    loadTheme();
    loadDraft();
};