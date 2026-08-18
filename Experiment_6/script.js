function processData() {
    const email = document.getElementById("emailInput").value.trim();
    const text = document.getElementById("textInput").value.trim();
    const resultsBox = document.getElementById("results");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const emailStatus = isEmailValid ? "Valid" : "Invalid";

    const wordCount = text === "" ? 0 : text.split(/\s+/).length;

    const charCountNoSpaces = text.replace(/\s/g, '').length;

    const numberRegex = /\d+/g;
    const extractedNumbers = text.match(numberRegex);
    const numbersFound = extractedNumbers ? extractedNumbers.join(", ") : "None";

    const uppercaseText = text.toUpperCase();

    resultsBox.style.display = "block";
    resultsBox.innerHTML = `
        Email Validation: <span class="highlight">${emailStatus}</span><br>
        Word Count: <span class="highlight">${wordCount}</span><br>
        Character Count (No Spaces): <span class="highlight">${charCountNoSpaces}</span><br>
        Numbers Extracted: <span class="highlight">${numbersFound}</span><br>
        <hr>
        <strong>Uppercase Conversion:</strong><br>
        ${uppercaseText}
    `;
}