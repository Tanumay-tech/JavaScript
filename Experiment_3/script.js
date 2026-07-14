// EXPERIMENT 3 LOGIC: Control Structures and Validation

function processGrades() {
    // 1. Fetching input values
    const dsInput = document.getElementById("dsMarks").value;
    const webInput = document.getElementById("webMarks").value;
    const mathInput = document.getElementById("mathMarks").value;
    
    const resultBox = document.getElementById("result-box");

    // 2. FORM VALIDATION (Control Structure: if-else)
    // Check if any field is completely empty
    if (dsInput === "" || webInput === "" || mathInput === "") {
        displayResult("Error: All fields must be filled out.", "error");
        return; // Stop execution
    }

    // Convert strings to numbers for calculation
    const ds = parseFloat(dsInput);
    const web = parseFloat(webInput);
    const math = parseFloat(mathInput);

    // Validate if the numbers are actually between 0 and 100
    if (ds < 0 || ds > 100 || web < 0 || web > 100 || math < 0 || math > 100) {
        displayResult("Error: Marks must be between 0 and 100.", "error");
        return; 
    }

    // 3. CALCULATION
    const totalMarks = ds + web + math;
    const average = totalMarks / 3;
    let grade = "";

    // 4. GRADING LOGIC (Control Structure: if, else if, else)
    if (average >= 90) {
        grade = "O (Outstanding)";
    } else if (average >= 80) {
        grade = "A+ (Excellent)";
    } else if (average >= 70) {
        grade = "A (Very Good)";
    } else if (average >= 60) {
        grade = "B+ (Good)";
    } else if (average >= 50) {
        grade = "B (Above Average)";
    } else if (average >= 40) {
        grade = "C (Pass)";
    } else {
        grade = "F (Fail)";
    }

    // 5. OUTPUT DISPLAY
    let outputMessage = `
        <strong>Total Marks:</strong> ${totalMarks.toFixed(2)} / 300 <br>
        <strong>Percentage:</strong> ${average.toFixed(2)}% <br>
        <strong>Final Grade:</strong> ${grade}
    `;

    displayResult(outputMessage, "success");
}

// Helper function to easily change the UI display states
function displayResult(message, statusClass) {
    const resultBox = document.getElementById("result-box");
    resultBox.style.display = "block";
    resultBox.innerHTML = message;
    
    // Switch between the success (green) and error (red) classes based on the validation
    if (statusClass === "error") {
        resultBox.className = "error";
    } else {
        resultBox.className = "success";
    }
}