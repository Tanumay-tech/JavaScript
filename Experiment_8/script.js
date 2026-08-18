const form = document.getElementById("gymForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const age = document.getElementById("age");
const weight = document.getElementById("weight");
const country = document.getElementById("country");
const phone = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");
const successBox = document.getElementById("successBox");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const ageError = document.getElementById("ageError");
const weightError = document.getElementById("weightError");
const countryError = document.getElementById("countryError");
const phoneError = document.getElementById("phoneError");

// Dictionary holding rules for different countries
const countryRules = {
    "India": {
        regex: /^\+91\s?[6-9]\d{9}$/,
        placeholder: "+91 9876543210",
        errorMsg: "Must be +91 followed by a 10-digit mobile number."
    },
    "USA": {
        regex: /^\+1\s?\d{10}$/,
        placeholder: "+1 2345678900",
        errorMsg: "Must be +1 followed by a 10-digit number."
    },
    "UK": {
        regex: /^\+44\s?\d{10}$/,
        placeholder: "+44 7912345678",
        errorMsg: "Must be +44 followed by a 10-digit number."
    },
    "Australia": {
        regex: /^\+61\s?\d{9}$/,
        placeholder: "+61 412345678",
        errorMsg: "Must be +61 followed by a 9-digit number."
    },
    "Canada": {
        regex: /^\+1\s?\d{10}$/,
        placeholder: "+1 2345678900",
        errorMsg: "Must be +1 followed by a 10-digit number."
    },
    "Other": {
        regex: /^\+?[0-9\s\-]{7,15}$/,
        placeholder: "+CountryCode Number",
        errorMsg: "Must be a valid international number (7-15 digits)."
    }
};

function validateName() {
    const regex = /^[a-zA-Z\s]{3,}$/;
    if (regex.test(fullName.value.trim())) {
        nameError.style.display = "none";
        fullName.style.borderColor = "#28a745";
        return true;
    } else {
        nameError.style.display = "block";
        fullName.style.borderColor = "#dc3545";
        return false;
    }
}

function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email.value.trim())) {
        emailError.style.display = "none";
        email.style.borderColor = "#28a745";
        return true;
    } else {
        emailError.style.display = "block";
        email.style.borderColor = "#dc3545";
        return false;
    }
}

function validateAge() {
    const val = parseInt(age.value);
    if (!isNaN(val) && val >= 16 && val <= 100) {
        ageError.style.display = "none";
        age.style.borderColor = "#28a745";
        return true;
    } else {
        ageError.style.display = "block";
        age.style.borderColor = "#dc3545";
        return false;
    }
}

function validateWeight() {
    const val = parseFloat(weight.value);
    if (!isNaN(val) && val >= 30 && val <= 300) {
        weightError.style.display = "none";
        weight.style.borderColor = "#28a745";
        return true;
    } else {
        weightError.style.display = "block";
        weight.style.borderColor = "#dc3545";
        return false;
    }
}

function validateCountry() {
    if (country.value !== "") {
        countryError.style.display = "none";
        country.style.borderColor = "#28a745";
        
        // Unlock phone input and update rules based on selection
        phone.disabled = false;
        const rules = countryRules[country.value];
        phone.placeholder = rules.placeholder;
        phoneError.innerText = rules.errorMsg;
        
        return true;
    } else {
        countryError.style.display = "block";
        country.style.borderColor = "#dc3545";
        
        // Lock phone input if no country is selected
        phone.disabled = true;
        phone.value = "";
        phoneError.innerText = "Please select a country to see the required format.";
        phone.style.borderColor = "#ccc";
        
        return false;
    }
}

function validatePhone() {
    // If no country is selected, phone is invalid automatically
    if (country.value === "") return false;

    const rules = countryRules[country.value];
    if (rules.regex.test(phone.value.trim())) {
        phoneError.style.display = "none";
        phone.style.borderColor = "#28a745";
        return true;
    } else {
        phoneError.style.display = "block";
        phone.style.borderColor = "#dc3545";
        return false;
    }
}

function checkFormValidity() {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isAgeValid = validateAge();
    const isWeightValid = validateWeight();
    const isCountryValid = validateCountry();
    
    // Re-validate phone whenever country changes
    const isPhoneValid = validatePhone(); 

    if (isNameValid && isEmailValid && isAgeValid && isWeightValid && isCountryValid && isPhoneValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Event Listeners
fullName.addEventListener("input", checkFormValidity);
email.addEventListener("input", checkFormValidity);
age.addEventListener("input", checkFormValidity);
weight.addEventListener("input", checkFormValidity);
country.addEventListener("change", checkFormValidity);
phone.addEventListener("input", checkFormValidity);

form.addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    successBox.style.display = "block";
    form.reset();
    submitBtn.disabled = true;
    phone.disabled = true;
    
    // Reset borders after submission
    fullName.style.borderColor = "#ccc";
    email.style.borderColor = "#ccc";
    age.style.borderColor = "#ccc";
    weight.style.borderColor = "#ccc";
    country.style.borderColor = "#ccc";
    phone.style.borderColor = "#ccc";
});