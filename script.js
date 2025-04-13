// Set the correct password here
const correctPassword = "toro"; // Change this to your desired password

// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function () {
  const isAuthenticated = localStorage.getItem("authenticated");

  if (isAuthenticated === "true") {
    // User is authenticated, show the diary
    document.getElementById("password-form").style.display = "none";
    document.getElementById("diary-section").style.display = "block";
    loadEntries(); // Load any saved entries if needed
  } else {
    // User is not authenticated, show the password form
    document.getElementById("password-form").style.display = "block";
  }
});

// Check the password when the user submits it
function checkPassword() {
  const enteredPassword = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  if (enteredPassword === correctPassword) {
    // If the password is correct, authenticate the user and show the diary
    localStorage.setItem("authenticated", "true");
    document.getElementById("password-form").style.display = "none";
    document.getElementById("diary-section").style.display = "block";
    loadEntries(); // Load any saved entries if needed
  } else {
    // If the password is incorrect, show an error message
    errorMessage.style.display = "block";
  }
}

// Function to save entries, etc.
function saveEntry() {
  const entryText = document.getElementById("diary-entry").value;

  if (entryText.trim() !== "") {
    // Get existing entries from localStorage or initialize an empty array
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];

    // Add the new entry to the array
    entries.push(entryText);

    // Save updated entries back to localStorage
    localStorage.setItem("diaryEntries", JSON.stringify(entries));

    // Add the entry to the page
    displayEntry(entryText);

    // Clear the textarea after saving
    document.getElementById("diary-entry").value = "";
  } else {
    alert("Please write something before saving.");
  }
}

function clearEntry() {
  document.getElementById("diary-entry").value = "";
}

function displayEntry(entryText) {
  const entriesDiv = document.getElementById("entries");
  const newEntry = document.createElement("div");
  newEntry.classList.add("entry");

  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Show/Hide Entry";
  toggleButton.onclick = function () {
    const hiddenText = newEntry.querySelector(".hidden-text");
    hiddenText.style.display = hiddenText.style.display === "none" ? "block" : "none";
  };

  const hiddenTextDiv = document.createElement("div");
  hiddenTextDiv.classList.add("hidden-text");
  hiddenTextDiv.textContent = entryText;

  newEntry.appendChild(toggleButton);
  newEntry.appendChild(hiddenTextDiv);

  entriesDiv.appendChild(newEntry);
}

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
  entries.forEach(displayEntry);
}
