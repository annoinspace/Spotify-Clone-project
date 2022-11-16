// Variable to count number of attempts.
let attempt = 3;

// Below function Executes on click of login button.
function validate() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;
  if (username == "spotify" && password == "spotify2022") {
    alert("Login successfully");
    location.href = "https://www.spotify.com"; // Redirecting to other page.
    return false;
  } else {
    attempt--; // Decrementing by one.
    alert("You have left " + attempt + " attempt;");
    // Disabling fields after 3 attempts.
    if (attempt == 0) {
      alert("Your Password or Email is incorrect");
      return false;
    }
  }
}
