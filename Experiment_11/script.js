import { formatTime, getRemainingTime } from './timerUtils.js';

const liveClock = document.getElementById('liveClock');
const subjectInput = document.getElementById('subjectInput');
const minutesInput = document.getElementById('minutesInput');
const addScheduleBtn = document.getElementById('addScheduleBtn');
const scheduleList = document.getElementById('scheduleList');
const alertBanner = document.getElementById('alertBanner');

let classes = [];

setInterval(() => {
    liveClock.innerText = formatTime(new Date());
    renderSchedules();
}, 1000);

liveClock.innerText = formatTime(new Date());

function showTemporaryAlert(message) {
    alertBanner.innerText = message;
    alertBanner.style.display = 'block';
    setTimeout(() => {
        alertBanner.style.display = 'none';
    }, 4000);
}

function renderSchedules() {
    scheduleList.innerHTML = '';
    classes.forEach(item => {
        const status = getRemainingTime(item.targetTime);
        const card = document.createElement('div');
        card.className = 'schedule-card';
        card.innerHTML = `
            <div>
                <strong>${item.subject}</strong><br>
                <small>Scheduled for: ${formatTime(new Date(item.targetTime))}</small>
            </div>
            <span class="badge ${status.expired ? 'started' : ''}">${status.text}</span>
        `;
        scheduleList.appendChild(card);
    });
}

addScheduleBtn.addEventListener('click', () => {
    const subject = subjectInput.value.trim();
    const mins = parseInt(minutesInput.value);

    if (!subject || isNaN(mins) || mins <= 0) {
        showTemporaryAlert("Please enter a valid subject and minutes.");
        return;
    }

    const targetTime = Date.now() + mins * 60000;
    classes.push({ subject, targetTime });

    subjectInput.value = '';
    minutesInput.value = '';
    renderSchedules();
    showTemporaryAlert(`Scheduled "${subject}" in ${mins} minute(s).`);
});