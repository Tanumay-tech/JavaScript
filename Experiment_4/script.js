// EXPERIMENT 4 LOGIC

// 1. GLOBAL SCOPE
// This variable can be accessed by any function in this file.
let totalChecks = 0; 

// 2. CLOSURE (and Function Expression)
// A closure is a function that remembers the variables from its outer scope even after the outer function has finished executing.
const createSessionTracker = function() {
    let validPalindromesFound = 0; // LOCAL SCOPE: Protected variable, cannot be accessed directly from outside
    
    return function(isPalindrome) {
        if (isPalindrome) {
            validPalindromesFound++;
        }
        return validPalindromesFound;
    };
};

// Initialize the closure
const trackPalindromes = createSessionTracker();

// 3. ARROW FUNCTION
// A modern, concise way to write functions. Used here as a helper utility.
const cleanString = (str) => {
    // Uses Regular Expression to remove all non-alphanumeric characters and converts to lowercase
    return str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
};

// 4. FUNCTION DECLARATION (with TRY-CATCH)
// Standard way to declare a function. Hoisted to the top of the scope.
function handleCheck() {
    const inputElement = document.getElementById("textInput");
    const rawText = inputElement.value;
    const resultBox = document.getElementById("result-box");
    const statsBox = document.getElementById("stats-box");

    totalChecks++; // Modifying global variable

    // 5. TRY-CATCH BLOCK for Error Handling
    try {
        // Throw an explicit error if the user clicks check without typing anything
        if (rawText.trim() === "") {
            throw new Error("Input cannot be empty. Please enter a word or phrase.");
        }

        let cleanedText = cleanString(rawText);
        
        // Check if cleaned string is too short to be considered a meaningful palindrome
        if (cleanedText.length < 2) {
            throw new Error("Please enter at least two valid alphanumeric characters.");
        }

        // Logic to check palindrome
        let reversedText = cleanedText.split('').reverse().join('');
        let isPalindrome = (cleanedText === reversedText);

        // Utilize the closure to update and get the protected count of valid palindromes
        let currentValidCount = trackPalindromes(isPalindrome);

        // Display results
        resultBox.style.display = "block";
        if (isPalindrome) {
            resultBox.innerHTML = `<strong>Yes!</strong> "${rawText}" is a palindrome.`;
            resultBox.className = "success";
        } else {
            resultBox.innerHTML = `<strong>No.</strong> "${rawText}" is not a palindrome.`;
            resultBox.className = "fail";
        }

        // Update stats
        statsBox.innerHTML = `Total checks: ${totalChecks} | Palindromes found this session: ${currentValidCount}`;

    } catch (error) {
        // This block catches the 'throw new Error()' from above
        resultBox.style.display = "block";
        resultBox.innerHTML = `<strong>Error:</strong> ${error.message}`;
        resultBox.className = "error";
    }
}