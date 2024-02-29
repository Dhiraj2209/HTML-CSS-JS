// Sample array of doctors (replace this with your actual data source)
var doctors = ["Dr. Jay","Dr. Honey","Dr. Vineet", "Dr. Jane Smith", "Dr. Michael Johnson"];

// Function to populate the dropdown list of doctors
function populateDoctors() {
    var doctorSelect = document.getElementById("doctor");
    doctorSelect.innerHTML = ""; // Clear existing options
    
    // Add default option
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Doctor";
    doctorSelect.appendChild(defaultOption);
    
    // Add options for each doctor
    doctors.forEach(function(doctor) {
        var option = document.createElement("option");
        option.value = doctor;
        option.textContent = doctor;
        doctorSelect.appendChild(option);
    });
}

// Call the function to populate doctors when the page loads
window.addEventListener("load", populateDoctors);
