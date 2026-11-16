export function formatTime(date) {
    return date.toLocaleTimeString('en-IN', { hour12: true });
}

export function getRemainingTime(targetTimestamp) {
    const diff = targetTimestamp - Date.now();
    if (diff <= 0) {
        return { expired: true, text: "In Progress" };
    }
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return {
        expired: false,
        text: `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`
    };
}