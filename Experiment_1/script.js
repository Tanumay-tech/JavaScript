// This is the External JavaScript file

// Demonstrating various console methods
console.log("--- External JavaScript Loaded ---");

// 1. console.log() - For standard output
console.log("Welcome to Experiment 1. This is a standard log message.");

// 2. console.warn() - For warnings (shows up yellow in the browser console)
console.warn("This is a warning message: Make sure to check your syntax!");

// 3. console.error() - For errors (shows up red in the browser console)
console.error("This is an error message: Something went wrong (intentionally)!");

// 4. console.table() - Great for displaying arrays or objects neatly
const studentData = {
    Name: "Tanumay",
    Branch: "CSE",
    Year: "2nd Year",
    College: "SIT Nagpur"
};
console.log("Displaying user info in a table format:");
console.table(studentData);

// 5. console.time() and console.timeEnd() - To measure how long an operation takes
console.time("Loop Timer");
for(let i = 0; i < 1000; i++) {
    // Just a dummy loop to take up a tiny fraction of time
}
console.timeEnd("Loop Timer");